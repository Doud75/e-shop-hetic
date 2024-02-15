<script>
  import {deleteDoc, doc} from "firebase/firestore";
  import {db} from "../config.js";

  export let product
  export let products

  export let showAlert

  function displayAlert() {
    showAlert = !showAlert
  }
  async function deleteProduct() {
    await deleteDoc(doc(db, "product", product.id));
    products = products.filter((existingProduct) => product.id !== existingProduct.id)
    displayAlert()
  }
</script>

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
