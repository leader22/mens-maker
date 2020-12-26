const fs = require("fs").promises;
const path = require("path");
const cheerio = require("cheerio");
const csstree = require("css-tree");

const svgInDir = "./data";
const svgOutDir = "./public/data";
const manifestOutDir = "./src";

// このスクリプト = (最適化前SVG) => 最適化後SVG + マニフェスト
// - SVGはデフォルトで色の指定がある + よくわからない要素が残ってる
// - なので、必要なpathだけを残して再生成する
// - 色の指定もマニフェスト側にコピーして、SVGからは消す

(async () => {
  const manifest = {
    // [$zIndex_$partsName]: {
    //   [$partsId]: {
    //     [$partsCls]: $defaultColor
    //   }
    // }
  };

  await fs.rmdir(path.resolve(svgOutDir), { recursive: true });
  await fs.mkdir(path.resolve(svgOutDir), { recursive: true });

  const partsDirs = await fs.readdir(path.resolve(svgInDir));
  for (const partsDir of partsDirs) {
    const parts = {};

    const partsItems = await fs.readdir(path.resolve(svgInDir, partsDir));
    await fs.mkdir(path.resolve(svgOutDir, partsDir));
    for (const partsItem of partsItems) {
      const [partsId] = partsItem.split(".");

      const svg = await fs.readFile(path.resolve(svgInDir, partsDir, partsItem), "utf8");
      const parsed = parseSvg(svg, `${partsDir}/${partsItem}`);
      parts[partsId] = { ...parsed.defaultStyles };

      await fs.writeFile(
        path.resolve(svgOutDir, partsDir, partsItem),
        parsed.svgStr,
        "utf8"
      );
    }

    manifest[partsDir] = parts;
  }

  await fs.writeFile(
    path.resolve(manifestOutDir, "manifest.js"),
    `export default ${JSON.stringify(manifest)};`,
    "utf8"
  );
})();

const parseSvg = (svgStr, debugLabel) => {
  const $ = cheerio.load(svgStr);

  // html > head+(body > svg)
  const $svg = $("svg");

  // remove unknown useless group
  $svg.children("g").remove();

  // then find path.cls to change color
  const validClassNames = new Set();
  // almost all are path, 0_bg is rect
  $svg.find("path, rect").each((_, el) => {
    const $el = $(el);

    const cls = $el.attr("class");
    cls && validClassNames.add(cls);

    // remove useless style
    $el.removeAttr("transform");
  });

  // pick default colors
  const defaultStyles = {};
  const style = $svg.find("style").html();
  csstree.walk(csstree.parse(style), {
    visit: "ClassSelector",
    enter(selector) {
      if (!validClassNames.has(selector.name))
        return this.skip;

      csstree.walk(this.rule, {
        visit: "Declaration",
        enter(decl) {
          if (decl.property !== "fill")
            return this.skip;

          let color = csstree.generate(decl.value);

          // convert color format #abc -> #aabbcc
          if (/^#[0-9a-fA-F]{3}$/.test(color))
            color = "#"
              + color.charAt(1) + color.charAt(1)
              + color.charAt(2) + color.charAt(2)
              + color.charAt(3) + color.charAt(3);

          // color format must be #aaaaaa, not #aaa, red, ...etc
          if (/^#[0-9a-fA-F]{6}$/.test(color) === false)
            console.warn(`Invalid format: ${color} in ${debugLabel}`);

          defaultStyles[selector.name] = color;
        }
      });
    },
  });

  // then remove it
  $svg.find("defs").remove();

  return {
    defaultStyles,
    svgStr: $svg.parent().html(),
  }
};
