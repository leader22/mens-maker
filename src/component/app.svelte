<script>
  import manifest from "../manifest.js";
  import { createStore } from "../state.js";
  import { uniteSvgs, svgToPng, download } from "../utils.js";
  import Renderer from "./renderer.svelte";
  import Controller from "./controller.svelte";

  const {
    partsSettings,
    colorsSettings,
    setItem,
    setColor,
  } = createStore(manifest);

  const size = 500;
  const svgContainer = { current: null };
  const downloadPng = async () => {
    if (svgContainer.current === null) return;

    const $parts = svgContainer.current.querySelectorAll("svg");
    const $svg = uniteSvgs($parts, size);
    const png = await svgToPng($svg, size);
    download(png, "your-man.png");
  };
</script>

<h1>Mens Maker</h1>

<main>
  <Renderer
    {partsSettings}
    {colorsSettings}
    {svgContainer}
  />

  <div class="center">
    <button on:click={downloadPng}>DOWNLOAD</button>
  </div>

  <Controller
    {manifest}
    {partsSettings}
    {colorsSettings}
    {setItem}
    {setColor}
  />
</main>

<style>
  h1 {
    text-align: center;
    margin: 0;
  }

  main {
    width: auto;
    margin: 0 2%;
    background-color: #fff;
    padding: 2%;
  }

  .center {
    text-align: center;
  }
</style>
