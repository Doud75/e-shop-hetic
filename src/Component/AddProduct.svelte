<script>
  import {collection, addDoc, getDocs} from "firebase/firestore";
  import {db} from "/src/config.js";

  export let popup
  export let products
  let name
  let description
  let price

  function handleSubmit() {
    addDoc(collection(db, 'product'), {
      name,
      description,
      price
    })
      .then(async () => {
        products = [];
        const querySnapshot = await getDocs(collection(db, 'product'))
        querySnapshot.forEach(doc => {
            products.push(doc.data())
        })
        displayPopup()
      })
  }

  function displayPopup() {
    popup = !popup
  }
</script>

<div class="fixed top-0 left-0 flex items-center justify-center h-screen bg-black bg-opacity-50">
    <form on:submit={handleSubmit}
          class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <div class="flex flex-col w-3/4 p-8 bg-white rounded">
            <label for="name" class="text-[#646D74]">Nom</label>
            <input id="name" class="rounded-lg border-2 w-full mx-auto py-1 px-2 mt-2 mb-6" type="text"
                   bind:value={name}>
            <label for="description" class="text-[#646D74]">Description</label>
            <input id="description" class="rounded-lg border-2 w-full mx-auto py-1 px-2 mt-2 mb-6" type="text"
                   bind:value={description}>
            <label for="price" class="text-[#646D74]">Prix</label>
            <input id="price" class="rounded-lg border-2 w-full mx-auto py-1 px-2 mt-2 mb-6" type="number"
                   bind:value={price}>
            <div class="flex justify-end mx-auto mt-4 ">
                <button type="button" class="bg-red-500 text-white px-4 py-2 rounded" on:click={displayPopup}>Annuler
                </button>
                <button type="submit" class="bg-[#319795] text-white px-4 py-2 rounded mx-2">Valider</button>
            </div>
        </div>
    </form>
</div>
