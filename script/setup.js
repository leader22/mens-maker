const fs = require("fs").promises;
const path = require("path");
const cheerio = require("cheerio");
const csstree = require("css-tree");

const svgInDir = "./data";
const svgOutDir = "./public/data";

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
      const parsed = parseSvg(svg);
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
    path.resolve(svgOutDir, "manifest.js"),
    `export default ${JSON.stringify(manifest)};`,
    "utf8"
  );
})();

const parseSvg = (svgStr) => {
  const $ = cheerio.load(svgStr);

  // html > head+(body > svg)
  const $svg = $("svg");

  // remove unknown useless group
  $svg.children("g").remove();

  // then find path.cls for color change
  const validClassNames = new Set();
  $svg.find("path").each((_, el) => {
    const cls = $(el).attr("class");
    cls && validClassNames.add(cls);
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

          defaultStyles[selector.name] = csstree.generate(decl.value);
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
