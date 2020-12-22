<script>
  export let partsSettings;
  export let colorsSettings;

  let svgsPromise;
  partsSettings.subscribe((state) => {
    svgsPromise = Promise.all(
      Object.entries(state).map(([partsName, id]) => 
        fetch(`./data/${partsName}/${id}.svg`)
          .then((res) => res.text())
          .then((svg) => ({ svg, partsName }))
      )
    );
  });
</script>

{#each Object.entries($colorsSettings) as [partsName, colors]}
  {@html `
  <style>
    ${Object.entries(colors).map(([cls, color]) => `
      #svg-${partsName} svg .${cls} { fill: ${color}; }
    `.trim()).join("")}
  </style>
  `}
{/each}

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
    height: 20vh;
    width: 20vh;
    margin: 0 auto;
  }

  :global(.stage svg) {
    position: absolute;
    height: 100%;
    width: auto;
  }
</style>
