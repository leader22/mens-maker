import manifest from "./manifest.js";
import App from "./app.svelte";

const app = new App({
  target: document.body,
  props: { manifest }
});
