<script>
  import manifest from "../manifest.js";
  import { createStore } from "../state.js";
  import Renderer from "./renderer.svelte";
  import Controller from "./controller.svelte";
  import Modal from "./modal.svelte";

  const {
    partsSettings,
    colorsSettings,
    svgContainer,
    finished,
    setItem,
    setColor,
    toggleFinish,
  } = createStore(manifest);
</script>

<header>
  <h1>メンズジェネレーター</h1>
  <a href="." on:click|preventDefault={toggleFinish}>
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

<Modal
  {svgContainer}
  {finished}
  {toggleFinish}
/>

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
      height: 40px;
    }
    header h1 {
      font-size: 1.1rem;
    }
    header a {
      font-size: .8rem;
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
      height: 30vh;
      background-color: rgba(0, 0, 0, .2);
    }
  }
</style>
