<script>
  import Errors from "/src/Component/_Errors.svelte";
  import Delete from "/src/Component/_DeleteProduct.svelte";
  import Update from "/src/Component/_UpdateProduct.svelte";


  export let product
  export let products
  export let key
  let showPopup = false;
  let showAlert = false;
  let errors;


  function displayPopup() {
    showPopup = !showPopup
  }

  function displayAlert() {
    showAlert = !showAlert
  }

</script>

<Errors {errors} />
{#if showPopup}
    <Update bind:product bind:products bind:showPopup bind:key bind:errors/>
{/if}
{#if showAlert}
    <Delete bind:products bind:product bind:showAlert/>
{/if}
<!-- <div class="flex gap-10 p-4 border-solid border-2"> -->
<div class="border border-[#DAE7E3] flex gap-10 px-4 py-3 rounded relative justify-between" >
    <div class="flex gap-4">
        <img src={product.imageProductUrl} alt="image produit" class="w-[70px] h-[70px] object-cover">
        <div class="flex flex-col gap-1">
            <h2 class="text-lg font-semibold">
                {product.name}
            </h2>
            <p>
                {product.description}
            </p>
        </div>
    </div>
    <div class="flex gap-8 items-center">
        <p class="font-bold">
            {product.price}€
        </p>
        <div class="flex flex-col gap-4">
            <button
                    class="text-[#319795] underline"
                    on:click={displayPopup}>
                Modifier
            </button>
            <button
                    class="text-red-500 underline"
                    on:click={displayAlert}>
                Supprimer
            </button>
        </div>
    </div>
</div>
