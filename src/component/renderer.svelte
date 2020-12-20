<script>
  export let partsSettings;

  let svgsPromise;
  partsSettings.subscribe((state) => {
    svgsPromise = Promise.all(
      Object.entries(state).map(([partsName, id]) => 
        fetch(`/data/${partsName}/${id}.svg`)
          .then((res) => res.text())
          .then((svg) => ({ svg, partsName }))
      )
    );
  });
</script>

<div class="stage">
  {#await svgsPromise}
    <div>Loading...</div>
  {:then svgs}
    {#each svgs as { svg, partsName }}
      <div id="svg-{partsName}">
        {@html svg}
      </div>
    {/each}
  {/await}
</div>

<style>
  .stage {
    position: relative;
    height: 40vh;
    width: 40vh;
    margin: 0 auto;
  }

  :global(.stage svg) {
    position: absolute;
    height: 100%;
    width: auto;
  }
</style>
