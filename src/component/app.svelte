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
    const pngAsUrl = await svgToPng($svg, size);
    download(pngAsUrl, "your-man.png");
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

    <a class="download" href="#" on:click|preventDefault={downloadPng}>
      これで完成
    </a>
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
    text-align: center;
    display: block;
    width: 160px;
    text-decoration: none;
    color: inherit;
    font-size: 1.2rem;
    background-color: #2d69d6;
    padding: 12px 36px;
    margin: 40px auto;
  }
</style>
