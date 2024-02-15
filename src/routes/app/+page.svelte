<script>
  import { auth } from "/src/config.js";
  import { onAuthStateChanged } from "firebase/auth";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount } from 'svelte';
  import AddProduct from "/src/Component/_AddProduct.svelte";
  import Product from "/src/Component/_Product.svelte";
  import { getUsers } from "/src/helpers/helperUsers.js" 


  let userLog;
  let popup = false;
  let products = $page.data.products;
  let users = [];

  onMount(async () => {
    users = await getUsers();
    console.log(products);
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
</script>
<div class="flex justify-between mb-8">
  <h1 class="text-5xl font-semibold">Bonjour</h1>
  <button on:click={displayPopup} class="mb-6 rounded-lg p-4 bg-[#319795] text-white py-2">Ajouter un produit</button>
</div>
<div class="flex flex-col gap-6">
    {#each products as product, key}
        <Product {product} bind:products {key}/>
    {/each}
</div>
{#if popup}
    <AddProduct bind:popup updateProducts={updateProducts}/>
{/if}
