<script>
  import { getInitialState } from "../state.js";
  export let manifest;

  const state = getInitialState(manifest);

  const setItem = (partsName, itemId) => {
    state.settings[partsName].id = itemId;
    // reset to defaults
    state.settings[partsName].colors = manifest[partsName].items[itemId];
  };

  const setColor = (partsName, colorId, color) => {
    state.settings[partsName].colors[colorId] = color;
  };

  $: {
    console.clear();
    console.log(JSON.stringify(state.settings, null, 2));
  }
</script>

{#each Object.entries(manifest) as [partsName, parts]}
  <section>
    <h2>{partsName}</h2>
    <div>
      {#each Object.entries(parts.items) as [itemId, item]}
        <button
          on:click={() => setItem(partsName, itemId)}
          class:selected={state.settings[partsName].id === itemId}
        >
          <img
            src="/data/{parts.zIndex}_{partsName}/{itemId}.svg"
            alt=""
            height="20"
            width="auto"
          />
        </button>
      {/each}

      <div>
        {#each Object.entries(state.settings[partsName].colors) as [colorId, color]}
          <input
            type="color"
            value={color}
            on:change={
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
  }
  button.selected {
    border-color: blue;
  }
</style>
