<script>
  import { partsDisplaySettings } from "../constants.js";
  import { toPartsLabel } from "../utils.js";
  export let manifest;
  export let partsSettings;
  export let colorsSettings;
  export let setItem;
  export let setColor;
</script>

{#each Object.entries(manifest) as [partsName, parts]}
  <section class="{toPartsLabel(partsName)}">
    <h2>{toPartsLabel(partsName).toUpperCase()}</h2>
    <div>
      {#if partsDisplaySettings[partsName].nullable}
        <button
          on:click={() => setItem(partsName, null)}
          class:selected={$partsSettings[partsName] === null}
          disabled={$partsSettings[partsName] === null}
        >x</button>
      {/if}
      {#each Object.entries(parts) as [itemId, item]}
        <button
          on:click={() => setItem(partsName, itemId)}
          class:selected={$partsSettings[partsName] === itemId}
          disabled={$partsSettings[partsName] === itemId}
        >
          <img
            src="./data/{partsName}/{itemId}.svg"
            alt=""
            height="60"
            width="auto"
          />
        </button>
      {/each}

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

  button {
    border: 2px solid #fff;
    overflow: hidden;
  }
  button.selected {
    border-color: blue;
  }

  .clothes img {
    transform: scale(1.5) translate(-10%, -15%);
  }
  .mouth img {
    transform: scale(6) translate(10%, -10%);
  }
  .eyes img {
    transform: scale(4) translate(15%, 10%);
  }
  .beard img {
    transform: scale(2) translate(0%, 0%);
  }
  .eyebrows img {
    transform: scale(4) translate(17%, 15%);
  }
  .hair img {
    transform: scale(1.5) translate(5%, 25%);
  }
  .item img {
    transform: scale(3) translate(13%, 10%);
  }
</style>
