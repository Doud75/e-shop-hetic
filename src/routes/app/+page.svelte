<script>
  import {auth, db} from "/src/config.js";
  import {onAuthStateChanged} from "firebase/auth";
  import {goto} from "$app/navigation";
  import AddProduct from "/src/Component/AddProduct.svelte";
  /*import {collection, getDocs} from "firebase/firestore";*/
  import {page} from "$app/stores";
  /*import {doc, setDoc} from "firebase/firestore";*/

  let userLog
  let popup = false
  let products = $page.data.products

  function displayPopup() {
    popup = !popup
  }

  if(typeof window !== 'undefined') {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        userLog = user
      } else {
        goto('/auth/login')
      }
    });
    /*fetchData()*/
  }

 /* async function fetchData() {
    const querySnapshot = await getDocs(collection(db, 'product'))
    querySnapshot.forEach(doc => {
      products.push(doc.data())
    })
    console.log(products)
  }*/

  $: products
  $: userLog

</script>

<button on:click={displayPopup} class="mb-6 rounded-lg w-full bg-[#319795] text-white py-2">Ajouter un produit</button>
<div>
    {#each products as product}
        <span>-----------------------</span>
        <div>{product.name}</div>
        <div>{product.description}</div>
        <div>{product.price}</div>
    {/each}
</div>
{#if popup}
    <AddProduct bind:popup bind:products/>
{/if}
