<script>
	import Button from './_Button.svelte';
	import ButtonQuantity from './_ButtonQuantity.svelte';
	export let product;
	export let products;
	export let key;

  function increment(product) {
    if (typeof localStorage !== 'undefined') {
      const basket = JSON.parse(localStorage.getItem("basket")) || [];
      const existingProductIndex = basket.findIndex(item => item.id === product.id);
      if (existingProductIndex !== -1) {
        basket[existingProductIndex].quantity++;
        products[key].quantity++
      } else {
        basket.push({...product, quantity: 1});
        products[key].quantity = 1
      }
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  }

  function decrement(product) {
    if (typeof localStorage !== 'undefined') {
      const basket = JSON.parse(localStorage.getItem("basket"));
      const existingProductIndex = basket.findIndex(item => item.id === product.id);
      if (existingProductIndex !== -1) {
        if (basket[existingProductIndex].quantity > 1) {
          basket[existingProductIndex].quantity--;
          products[key].quantity--
        } else {
          basket.splice(existingProductIndex, 1);
          products[key].quantity = 0
        }
        localStorage.setItem("basket", JSON.stringify(basket));
      }
    }
  }

</script>

<div class="border border-[#DAE7E3] px-4 py-3 rounded relative w-fit flex flex-col gap-2">
	<img class="w-[400px] h-[300px] object-cover rounded" src={product?.url} alt={`${product?.name} image`} />
	<div class="flex justify-between gap-2">
		<p>{product?.name}</p>
		<p class="font-medium">{product?.price}</p>
	</div>
	<p>{product?.description}</p>
  {#if products[key].quantity > 0}
    <ButtonQuantity buttonText="Ajouter au panier" quantity={product?.quantity} increment={() => increment(product)} decrement={() => decrement(product)}/>
  {:else}
  <Button buttonText="Ajouter au panier" on:click={increment(product)}/>
  {/if}
</div>
