<script>
  import {doc, deleteDoc, updateDoc} from "firebase/firestore";
  import { db } from "/src/config.js";

  export let product
  export let products
  export let key
  let showPopup = false;
  let showAlert = false;
  let newName = product.name
  let newPrice = product.price
  let newDescription = product.description
  let newKey = key

  function displayPopup() {
    showPopup = !showPopup
  }

  function displayAlert() {
    showAlert = !showAlert
  }

  async function modifyProduct() {
    await updateDoc(doc(db, "product", product.id), {
      "price": newPrice,
      "name": newName,
      "description": newDescription,
    });
    products[key] = {
      price: newPrice,
      name: newName,
      description: newDescription,
      id: product.id
    };
    displayPopup()
  }

  async function deleteProduct() {
    await deleteDoc(doc(db, "product", product.id));
    products = products.filter((existingProduct) => product.id !== existingProduct.id)
    displayAlert()
  }

  $:newName
  $:newPrice
  $:newDescription
  $:newKey
</script>

{#if showPopup}
    <div class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <form on:submit={modifyProduct} class="flex flex-col w-3/4 p-8 bg-white rounded">
            <h2 class="mb-4 text-xl font-bold">Modifier le produit</h2>
            <div class="mb-4">
                <label for="name">Nom</label>
                <input id="name" placeholder="{product.name}" type="text" class="rounded-lg border-2 w-full mx-auto py-1 px-2 mt-2 mb-6" bind:value={newName}>
            </div>
            <div class="mb-4">
                <label for="description">Description</label>
                <input id="description" placeholder="{product.description}" type="text" class="rounded-lg border-2 w-full mx-auto py-1 px-2 mt-2 mb-6" bind:value={newDescription}>
            </div>
            <div class="mb-4">
                <label for="price">Prix</label>
                <input id="price" placeholder="{product.price}" type="number" class="rounded-lg border-2 w-full mx-auto py-1 px-2 mt-2 mb-6" bind:value={newPrice}>
            </div>
            <div class="flex justify-end mx-auto mt-4 ">
                <button type="button" class="text-slate-400 px-4" on:click={displayPopup}>
                    Annuler
                </button>
                <button type="submit" class="bg-[#319795] text-white px-4 py-2 rounded mx-2">
                    Modifier
                </button>
            </div>
        </form>
    </div>
{/if}
{#if showAlert}
    <div class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <div class="flex flex-col w-3/4 p-8 bg-white rounded">
            <p>
                Êtes-vous sûr de vouloir supprimer ce produit :{" "}
                <strong class="font-bold">{product.name}</strong> ?
            </p>
            <div class="flex justify-end mx-auto mt-4 ">
                <button type="button" class="text-slate-400 px-4" on:click={displayAlert}>
                    Annuler
                </button>
                <button type="submit" class="bg-[#319795] text-white px-4 py-2 rounded mx-2" on:click={deleteProduct}>
                    Supprimer
                </button>
            </div>
        </div>
    </div>
{/if}
<div>
    <h2 class="text-lg font-semibold">
        {product.name}
    </h2>
    <p>
        {product.description}
    </p>
    <p class="text-slate-400">
        {product.price}€
    </p>
    <div>
        <button
                class="text-[#319795] underline"
                on:click={displayPopup}>
            Modifier
        </button>
    </div>
    <div>
        <button
                class="text-red-500 underline"
                on:click={displayAlert}>
            Supprimer
        </button>
    </div>
</div>
