<script>
  import {doc, deleteDoc} from "firebase/firestore";
  import { db } from "/src/config.js";

  export let product
  export let products
  export let key
  let showPopup = false;
  let showAlert = false;
  let newName = product.name
  let newPrice = product.price
  let newDescription = product.description

  function displayPopup() {
    showPopup = !showPopup
  }

  function displayAlert() {
    showAlert = !showAlert
  }

  async function modifyProduct() {
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
</script>

{#if showPopup}
    <div class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <form on:submit={modifyProduct()} class="flex flex-col w-3/4 p-8 bg-white rounded">
            <h2 class="mb-4">Modifier le produit</h2>
            <div class="mb-4">
                <label for="name">Nom</label>
                <input id="name" placeholder="{product.name}" type="text" class="form-control" bind:value={newName}>
            </div>
            <div class="mb-4">
                <label for="description">Description</label>
                <input id="description" placeholder="{product.description}" type="text" class="form-control" bind:value={newDescription}>
            </div>
            <div class="mb-4">
                <label for="price">Prix</label>
                <input id="price" placeholder="{product.price}" type="text" class="form-control" bind:value={newPrice}>
            </div>
            <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-primary mx-2">Valider</button>
                <button type="button" class="btn btn-danger" on:click={displayPopup}>Annuler</button>
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
                <button type="submit" class="bg-[#319795] text-white px-4 py-2 rounded mx-2" on:click={deleteProduct}>
                    Valider
                </button>
                <button type="button" class="bg-red-500 text-white px-4 py-2 rounded" on:click={displayAlert}>
                    Annuler
                </button>
            </div>
        </div>
    </div>
{/if}
<tr>
    <td>
        {product.name}
    </td>
    <td>
        {product.description}
    </td>
    <td>
        {product.price}
    </td>
    <td>
        <button
                class="bg-[#319795] text-white px-4 py-2 rounded mx-2"
                on:click={displayPopup}>
            Modifier
        </button>
    </td>
    <td>
        <button
                class="bg-red-500 text-white px-4 py-2 rounded"
                on:click={displayAlert}>
            Supprimer
        </button>
    </td>
</tr>
