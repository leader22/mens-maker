<script>
  export let colorsSettings;
</script>

{#each Object.entries($colorsSettings) as [partsName, colors]}
  {@html `
  <style>
    ${Object.entries(colors).map(([cls, color]) => `
      #svg-${partsName} svg path.${cls} { fill: ${color}; }
    `.trim()).join("")}
  </style>
  `}
{/each}
