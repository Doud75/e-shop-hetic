<script>
  export let quantity;
  export let decrement;
  export let increment;
</script>

<div class="flex font-medium align-center items-center justify-between">
  <button class="border border-red-400 rounded py-2 px-3" on:click={decrement}>
    -
  </button>
  <p>{quantity}</p>
  <button class="border border-[#319795] rounded py-2 px-3" on:click={increment}>
    +
  </button>
</div>