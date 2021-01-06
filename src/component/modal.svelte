<script>
  import { fly, fade } from "svelte/transition";
  import { mergeSvgs, svgToPng, download } from "../utils.js";

  export let svgContainer;
  export let finished;
  export let toggleFinish;

  let imgPromise = new Promise(() => {});
  finished.subscribe((yes) => {
    if (!yes) return;
    if (svgContainer.current === null) return;

    const size = 700;
    const $svg = mergeSvgs(
      svgContainer.current.querySelectorAll("svg"),
      size
    );
    imgPromise = svgToPng($svg, size);
  });

  const downloadPng = () =>
    imgPromise.then((src) => download(src, "your-man.png"));
</script>

{#if $finished}
  <div
    class="modal"
    transition:fade
  >
    <nav>
      <a href="." on:click|preventDefault={toggleFinish}>もどる</a>
    </nav>
    <div
      class="content"
      transition:fly="{{ y: 800, duration: 500, delay: 100 }}"
    >
      {#await imgPromise}
        <div class="loading">Loading...</div>
      {:then src}
        <img src={src} alt="" width="70%" />
      {/await}

      <p>画像を右クリック or 長押しで保存</p>
      <p>もしくは</p>
      <a href="." on:click|preventDefault={downloadPng}>ファイルとして保存</a>
      <hr />
      <a href="." on:click|preventDefault={() => alert("TODO")}>このサイトをシェア</a>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .8);
    padding: 8px;
    box-sizing: border-box;
  }

  .content, .modal nav {
    max-width: 1024px;
    margin: 0 auto;
  }

  .modal nav {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 8px;
  }

  .modal a {
    text-decoration: none;
    color: inherit;
    background-color: #2d69d6;
    padding: 4px 8px;
  }

  .content {
    text-align: center;
  }

  .content p {
    font-size: .8rem;
    margin: 8px auto;
  }

  .content hr {
    margin: 16px auto;
    border-style: dashed;
  }

  .loading {
    text-align: center;
    font-size: 1.5rem;
    padding: 30%;
  }

  @media screen and (max-width: 480px) {
    .modal a {
      font-size: .8rem;
    }

    .content p {
      font-size: .7rem;
      margin: 4px auto;
    }
  }
</style>
