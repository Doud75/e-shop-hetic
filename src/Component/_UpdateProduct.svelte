<script>
  import {ref, uploadBytes} from "firebase/storage";
  import {db, storage} from "../config.js";
  import {getImageProductUrl} from "../helpers/helperProducts.js";
  import {doc, updateDoc} from "firebase/firestore";
  import {generateUUID} from "../helpers/uuid.js";

  export let product
  export let products
  export let key
  export let errors
  export let showPopup
  let uuid = generateUUID()
  let newName = product.name
  let newPrice = product.price
  let newDescription = product.description
  let newFileName = product.fileName
  let newimageProductUrl = product.imageProductUrl
  let newKey = key
  let selectedFile;

  function displayPopup() {
    showPopup = !showPopup
  }

  function handleFileInput(event) {
    selectedFile = event.target.files[0];
  }

  async function modifyProduct() {
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop();
      newFileName = uuid + '.' + fileExtension
      const storageRef = ref(storage, 'images/' + newFileName);
      try {
        await uploadBytes(storageRef, selectedFile);
      } catch (error) {
        errors = [error]
        console.error('Error uploading file:', error);
      }
      newimageProductUrl = await getImageProductUrl({fileName: newFileName})
    }
    await updateDoc(doc(db, "product", product.id), {
      "price": newPrice,
      "name": newName,
      "description": newDescription,
      "fileName": newFileName
    });

    products[key] = {
      price: newPrice,
      name: newName,
      description: newDescription,
      fileName: newFileName,
      imageProductUrl: newimageProductUrl,
      id: product.id
    };
    displayPopup()
  }

  $:newName
  $:newPrice
  $:newDescription
  $:newKey
  $:newFileName
  $:newimageProductUrl
  $:selectedFile
</script>

<div class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
    <form on:submit={modifyProduct} class="flex flex-col w-3/4 p-8 bg-white rounded">
        <h2 class="mb-4 text-xl font-bold">Modifier le produit</h2>
        <div class="mb-4">
            <label for="file" class="text-[#646D74]">File</label>
            <input id="file" type="file" accept="image/*" on:change={handleFileInput}/>
        </div>
        <div class="mb-4">
            <label for="name">Nom</label>
            <input id="name" placeholder="{product.name}" type="text"
                   class="rounded-lg border-2 w-full mx-auto py-1 px-2 mt-2 mb-6" bind:value={newName}>
        </div>
        <div class="mb-4">
            <label for="description">Description</label>
            <input id="description" placeholder="{product.description}" type="text"
                   class="rounded-lg border-2 w-full mx-auto py-1 px-2 mt-2 mb-6" bind:value={newDescription}>
        </div>
        <div class="mb-4">
            <label for="price">Prix</label>
            <input id="price" placeholder="{product.price}" type="number"
                   class="rounded-lg border-2 w-full mx-auto py-1 px-2 mt-2 mb-6" bind:value={newPrice}>
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
