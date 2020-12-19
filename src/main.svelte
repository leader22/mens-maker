<script>
  import App from "./component/app.svelte";
</script>

<h1>Mens Maker</h1>

<main>
  {#await import("/data/manifest.js").then((m) => m.default)}
    <div>Loading...</div>
  {:then manifest}
    <App {manifest} />
  {:catch err}
    <div>Failed to load manifest...</div>
  {/await}
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
