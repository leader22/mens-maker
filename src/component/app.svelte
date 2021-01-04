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

  <a href="." on:click|preventDefault={downloadPng}>
    これで完成
  </a>
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
  </div>
</main>

<style>
  header, main {
    max-width: 1024px;
    margin: 0 auto;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }

  header h1 {
    margin: 0;
    padding: 8px 0;
    font-size: 1.3rem;
  }

  header a {
    text-decoration: none;
    color: inherit;
    background-color: #2d69d6;
    padding: 4px 8px;
  }

  main {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 16px;
  }

  @media screen and (max-width: 480px) {
    header {
      padding: 0 8px;
    }
    header h1 {
      font-size: 1.1rem;
    }
    header a {
      font-size: .9rem;
    }

    main {
      grid-template-columns: 1fr;
    }

    .tools {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 8px;
      overflow: scroll;
      height: 35vh;
      background-color: rgba(0, 0, 0, .5);
    }
  }
</style>
