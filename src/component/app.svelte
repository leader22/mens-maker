<script>
  import Renderer from "./renderer.svelte";
  import Controller from "./controller.svelte";
  import Style from "./style.svelte";
  import { createStore } from "../state.js";
  export let manifest;

  const {
    partsSettings,
    colorsSettings,
    setItem,
    setColor,
  } = createStore(manifest);
</script>

<Style {colorsSettings} />
<Renderer {partsSettings} />

<Controller
  {manifest}
  {partsSettings}
  {colorsSettings}
  {setItem}
  {setColor}
/>
