<script>
  export let partsSettings;
  export let colorsSettings;

  let svgsPromise = new Promise(() => {});
  partsSettings.subscribe((settings) => {
    svgsPromise = Promise.all(
      Object.entries(settings).map(([partsName, id]) => 
        fetch(`./data/${partsName}/${id}.svg`)
        .then((res) => res.text())
        .then((svg) => ({ svg, partsName }))
      )
    );
  });

  const colorize = ($el, colorsSettings) => {
    const applyColors = ($svgWrapper, settings) => {
      for (const [cls, color] of Object.entries(settings)) {
        for (const $el of $svgWrapper.querySelectorAll(`path.${cls}, rect.${cls}`)) {
          $el.style.fill = color;
        }
      }
    };

    applyColors($el, colorsSettings);

    return {
      update: (settings) => applyColors($el, settings),
    };
  };
</script>

<div class="stage">
  {#await svgsPromise}
    <div>Loading...</div>
  {:then svgs}
    {#each svgs as { svg, partsName }}
      <div use:colorize={$colorsSettings[partsName]}>
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
