<script>
  import { onMount } from "svelte";

  let manifest = null;
  onMount(() => {
    import("/data/manifest.js").then((m) => (manifest = m.default));
  });
</script>

{#if manifest === null}
  <p>waiting for the promise to resolve...</p>
{:else}
  <p>{JSON.stringify(manifest, null, 2)}</p>
{/if}

<style>
  p { color: blue; }
</style>
