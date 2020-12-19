<script>
  export let manifest;

  const state = {
    face: {
      id: "1",
      colors: { ...manifest["face"].items["1"] },
    },
    clothes: {
      id: "1",
      colors: { ...manifest["clothes"].items["1"] },
    },
    mouth: {
      id: "1",
      colors: { ...manifest["mouth"].items["1"] },
    },
    eyes: {
      id: "1",
      colors: { ...manifest["eyes"].items["1"] },
    },
    beard: {
      id: "1",
      colors: { ...manifest["beard"].items["1"] },
    },
    eyebrows: {
      id: "1",
      colors: { ...manifest["eyebrows"].items["1"] },
    },
    hair: {
      id: "1",
      colors: { ...manifest["hair"].items["1"] },
    },
    item: {
      id: "1",
      colors: { ...manifest["item"].items["1"] },
    },
  };

  $: {
    console.clear();
    console.log(JSON.stringify(state, null, 2));
  }

  const setItem = (partsName, itemId) => {
    state[partsName].id = itemId;
    // reset to defaults
    state[partsName].colors = manifest[partsName].items[itemId];
  };

  const setColor = (partsName, colorId, color) => {
    state[partsName].colors[colorId] = color;
  };
</script>

{#each Object.entries(manifest) as [partsName, parts]}
  <section>
    <h2>{partsName}</h2>
    <div>
      {#each Object.entries(parts.items) as [itemId, item]}
        <button
          on:click={() => setItem(partsName, itemId)}
          class:selected={state[partsName].id === itemId}
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
        {#each Object.entries(state[partsName].colors) as [colorId, color]}
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
