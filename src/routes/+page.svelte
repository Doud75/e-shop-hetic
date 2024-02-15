<script>
 	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import ProductContainer from '../Component/_ProductContainer.svelte';

	let products = $page.data.products;

	products = products?.map(product => ({
		...product,
    quantity: 0	
	}));

	
	if (typeof localStorage !== 'undefined') {
		let basket = localStorage.getItem("basket");

		if (basket) {
			basket = JSON.parse(basket);

			for (let basketProduct of basket) {
				let existingProductIndex = products.findIndex(product => product.id === basketProduct.id);
				
				if (existingProductIndex !== -1) {
					products[existingProductIndex].quantity += basketProduct.quantity;
				} else {
					basket = basket.filter(product => product.id !== basketProduct.id);
				}
			}

			localStorage.setItem("basket", JSON.stringify(basket));
		}
	}

	$: products;
</script>

<div class="my-4 text-center">
	<p class="text-[#646D74]">
		Vendeur ? <a class="text-[#319795]" href="/auth/login">Connectez-vous</a>
	</p>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
	{#each products as product, key}
		<ProductContainer {product} bind:products {key}/>
	{/each}
</div>
