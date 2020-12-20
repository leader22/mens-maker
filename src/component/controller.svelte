<script>
  export let manifest;
  export let partsSettings;
  export let colorsSettings;
  export let setItem;
  export let setColor;
</script>

{#each Object.entries(manifest) as [partsName, parts]}
  <section>
    <h2>{partsName}</h2>
    <div>
      {#each Object.entries(parts) as [itemId, item]}
        <button
          on:click={() => setItem(partsName, itemId)}
          class:selected={$partsSettings[partsName] === itemId}
        >
          <img
            src="./data/{partsName}/{itemId}.svg"
            alt=""
            height="40"
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
  }
  button.selected {
    border-color: blue;
  }
</style>
