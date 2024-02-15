<script>
	import Button from './_Button.svelte';
	export let product;
</script>

<div class="border border-[#DAE7E3] px-4 py-3 rounded relative w-fit flex flex-col gap-2">
	<img class="w-[400px] rounded" src={product?.image} alt={`${product?.name} image`} />
	<div class="flex justify-between gap-2">
		<p>{product?.name}</p>
		<p class="font-medium">{product?.price}</p>
	</div>
	<p>{product?.descritpion}</p>
	<Button buttonText="Ajouter au panier" />
</div>
