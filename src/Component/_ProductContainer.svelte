<script>
	import Button from './_Button.svelte';
  export let products = [
    {
      id: 1,
      image:'https://thispersondoesnotexist.com/',
      name: "produit 1",
      descritpion: "je suis une description d'un produit 1",
      price: "1€",
      quantity: 4
    },
    {
      id: 2,
      image:'https://thispersondoesnotexist.com/',
      name: "produit 2",
      descritpion: "je suis une description d'un produit 2",
      price: "2€",
      quantity: 4
    },
    {
      id: 3,
      image:'https://thispersondoesnotexist.com/',
      name: "produit 3",
      descritpion: "je suis une description d'un produit 3",
      price: "3€",
      quantity: 4
    },
    {
      id: 4,
      image:'https://thispersondoesnotexist.com/',
      name: "produit 4",
      descritpion: "je suis une description d'un produit 1",
      price: "1€",
      quantity: 4
    },
    {
      id: 5,
      image:'https://thispersondoesnotexist.com/',
      name: "produit 5",
      descritpion: "je suis une description d'un produit 2",
      price: "2€",
      quantity: 4
    },
    {
      id: 6,
      image:'https://thispersondoesnotexist.com/',
      name: "produit 6",
      descritpion: "je suis une description d'un produit 3",
      price: "3€",
      quantity: 4
    },
    {
      id: 7,
      image:'https://thispersondoesnotexist.com/',
      name: "produit 7",
      descritpion: "je suis une description d'un produit 1",
      price: "1€",
      quantity: 4
    },
    {
      id: 8,
      image:'https://thispersondoesnotexist.com/',
      name: "produit 8",
      descritpion: "je suis une description d'un produit 2",
      price: "2€",
      quantity: 4
    },
    {
      id: 9,
      image:'https://thispersondoesnotexist.com/',
      name: "produit 9",
      descritpion: "je suis une description d'un produit 3",
      price: "3€",
      quantity: 4
    }
  ];

</script>

{#if products && products.length > 0}
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {#each products as product}
      <div class="border border-[#DAE7E3]  px-4 py-3 rounded relative w-fit flex flex-col gap-2" >
        <img class="w-[400px] rounded" src={product?.image} alt={`${product?.name} image`}>
        <div class="flex justify-between gap-2">
          <p>{product?.name}</p>
          <p class="font-medium	">{product?.price}</p>
        </div>
        <p>{product?.descritpion}</p>
        <Button buttonText="Ajouter au panier" />
      </div>
    {/each}
  </div>
{/if} 
