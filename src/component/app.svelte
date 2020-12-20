<script>
  import manifest from "../manifest.js";
  import { createStore } from "../state.js";
  import Renderer from "./renderer.svelte";
  import Controller from "./controller.svelte";
  import Style from "./style.svelte";

  const {
    partsSettings,
    colorsSettings,
    setItem,
    setColor,
  } = createStore(manifest);
</script>

<h1>Mens Maker</h1>

<main>
  <Style {colorsSettings} />
  <Renderer {partsSettings} />

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
</style>
