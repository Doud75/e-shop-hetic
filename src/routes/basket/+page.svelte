<script>
  import ProductContainer from '../../Component/_ProductContainer.svelte'
  import Button from '../../Component/_Button.svelte'
  import { toasts, ToastContainer, FlatToast }  from "svelte-toasts";

  let products = []

  if (typeof localStorage !== 'undefined') {
    products = JSON.parse(localStorage.getItem("basket"))
  }

  const paiementToaster = () => {
    const toast = toasts.add({
      type: "info",
      theme: "light",
      description: "Commande validée ?",
      placement: "top-right",
    });
  }
</script>

<h1 class="flex justify-center text-xl font-medium mb-8">Mon panier</h1>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
	{#each products as product, key}
		<ProductContainer {product} bind:products {key}/>
	{/each}
</div>

<div class="mt-4 w-[400px] m-auto">
  <Button buttonText="Payer" on:click={paiementToaster}/>
</div>

<ToastContainer {toasts} let:data={data}>
  <FlatToast {data} />
</ToastContainer>
