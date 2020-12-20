<script>
  export let settings;

  $: svgsPromise = Promise.all(
    Object.keys(settings).map((partsName) => {
      const { id, colors } = settings[partsName];
      return fetch(`/data/${partsName}/${id}.svg`)
        .then((res) => res.text())
        .then((svg) => ({ svg, partsName, colors }));
    })
  );
</script>

<div class="stage">
  {#await svgsPromise}
    <div>Loading...</div>
  {:then  svgs}
    {#each svgs as { svg, partsName, colors }}
      {#each Object.entries(colors) as [cls, color]}
        <div id="svg-{partsName}">
          {@html `
          <style>
            #svg-${partsName} svg path.${cls} { fill: ${color}; }
          </style>
          ${svg}
          `}
        </div>
      {/each}
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
