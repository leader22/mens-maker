<script>
  import { partsDisplaySettings, partsLabels } from "../constants.js";
  export let manifest;
  export let partsSettings;
  export let colorsSettings;
  export let setItem;
  export let setColor;
</script>

{#each Object.entries(manifest) as [partsName, parts]}
  <div class="selector">
    <div class="label">{partsLabels[partsName]}</div>
    <select
      value={$partsSettings[partsName]}
      on:change={({ currentTarget: { value } }) => setItem(partsName, value || null)}
      on:blur={({ currentTarget: { value } }) => setItem(partsName, value || null)}
      disabled={Object.keys(parts).length < 2}
    >
      {#if partsDisplaySettings[partsName].nullable}
        <option value="">{partsLabels["off"]}</option>
      {/if}
      {#each Object.entries(parts) as [itemId, item]}
        <option value={itemId}>{partsLabels[`${partsName}/${itemId}`]}</option>
      {/each}
    </select>

    <div>
      {#each Object.entries($colorsSettings[partsName]) as [colorId, color]}
        <input
          type="color"
          value={color}
          on:input={
          ({ currentTarget: { value } }) => setColor(partsName, colorId, value)
          }
        />
      {/each}
    </div>
  </div>
{/each}

<style>
  .selector {
    display: grid;
    grid-template-columns: 40px 25% 1fr;
    align-items: center;
  }

  .selector + .selector {
    margin-top: 8px;
  }

  .label {
    text-align: center;
    text-shadow: 0 0 1px #000;
  }

  select {
    margin: 0 8px;
  }
</style>
