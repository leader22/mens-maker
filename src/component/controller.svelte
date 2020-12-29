<script>
  import { partsDisplaySettings, partsLabels } from "../constants.js";
  export let manifest;
  export let partsSettings;
  export let colorsSettings;
  export let setItem;
  export let setColor;
</script>

{#each Object.entries(manifest) as [partsName, parts]}
  <section>
    <h2>{partsLabels[partsName]}</h2>
    <div>
      <select
        value={$partsSettings[partsName]}
        on:change={({ currentTarget: { value } }) => setItem(partsName, value || null)}
        on:blur={({ currentTarget: { value } }) => setItem(partsName, value || null)}
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
  </section>
{/each}

<style>
  h2 {
    margin: 0;
  }
</style>
