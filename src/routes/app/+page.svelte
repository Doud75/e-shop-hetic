<script>
  import { auth } from "/src/config.js";
  import { onAuthStateChanged } from "firebase/auth";
  import { goto } from "$app/navigation";
  import AddProduct from "/src/Component/_AddProduct.svelte";
  import Product from "/src/Component/_Product.svelte";
  import { page } from "$app/stores";
  import { getUsers } from "/src/helpers/helperUsers.js" 
  import { onMount } from 'svelte';


  let userLog;
  let popup = false;
  let products = $page.data.products;

  let users = [];

  onMount(async () => {
    console.log('test');
    users = await getUsers();
    console.log(users);
  });


  function displayPopup() {
    popup = !popup;
  }

  function updateProducts(newProduct) {
    products = [...products, newProduct];
  }

  if (typeof window !== 'undefined') {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        userLog = user;
      } else {
        goto('/auth/login');
      }
    });
  }

  $: products
  $: userLog
  console.log(products);
  console.log(userLog);
</script>

<h1>Bonjour</h1>
<button on:click={displayPopup} class="mb-6 rounded-lg w-full bg-[#319795] text-white py-2">Ajouter un produit</button>
<div class="flex flex-col gap-8">
    {#each products as product, key}
        <Product {product} bind:products {key}/>
    {/each}
</div>
{#if popup}
    <AddProduct bind:popup updateProducts={updateProducts}/>
{/if}
