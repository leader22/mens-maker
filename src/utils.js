export const uniteSvgs = ($svgs, size = 350) => {
  const $dest = $svgs[0].cloneNode();
  $dest.style.width = $dest.style.height = size;

  for (const $svg of $svgs) {
    for (const $el of $svg.children) {
      $dest.append($el.cloneNode());
    }
  }

  return $dest;
};

export const svgToPng = async ($svg, size = 350) => {
  const $canvas = document.createElement("canvas");
  $canvas.width = $canvas.height = size;
  const ctx = $canvas.getContext("2d");

  const img = new Image();
  img.src = "data:image/svg+xml," + $svg.outerHTML;
  await new Promise((r) => img.onload = r);
  ctx.drawImage(img, 0, 0, size, size);

  const url = $canvas.toDataURL();
  $canvas.remove();
  return url;
}

export const download = (href, name) => {
  const $a = document.createElement("a");
  $a.href = href;
  $a.download = name;
  $a.click();
  $a.remove();
};
