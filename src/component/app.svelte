<script>
  import manifest from "../manifest.js";
  import { createStore } from "../state.js";
  import { mergeSvgs, svgToPng, download } from "../utils.js";
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

    const $svg = mergeSvgs(
      svgContainer.current.querySelectorAll("svg"),
      size
    );
    const png = await svgToPng($svg, size);
    download(png, "your-man.png");
  };
</script>

<header>
  <h1>メンズメーカー</h1>
</header>

<main>
  <Renderer
    {partsSettings}
    {colorsSettings}
    {svgContainer}
  />

  <div class="tools">
    <Controller
      {manifest}
      {partsSettings}
      {colorsSettings}
      {setItem}
      {setColor}
    />

    <div class="download">
      <button on:click={downloadPng}>DOWNLOAD</button>
    </div>
  </div>
</main>

<style>
  header,
  main {
    box-sizing: border-box;
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 16px;
  }

  header h1 {
    margin: 8px auto;
    font-size: 1.3rem;
  }

  main {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 16px;
  }

  @media screen and (max-width: 480px) {
    header h1 {
    font-size: 1.1rem;
    }

    main {
      grid-template-columns: 1fr;
    }

    .tools {
      position: fixed;
      left: 16px;
      right: 16px;
      bottom: 0;
    }
  }

  .download {
    padding: 16px 0;
    text-align: center;
  }
</style>
