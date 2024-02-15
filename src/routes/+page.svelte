<script>
	import { page } from '$app/stores';
	import ProductContainer from '../Component/_ProductContainer.svelte';
	let products = $page.data.products;
	$: products;
</script>

<div class="my-4 text-center">
	<p class="text-[#646D74]">
		Vendeur ? <a class="text-[#319795]" href="/auth/login">Connectez-vous</a>
	</p>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
	{#each products as product, key}
		<ProductContainer {product} bind:products {key} />
	{/each}
</div>
