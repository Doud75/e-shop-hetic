<script>
  import { collection, addDoc, getDoc, doc } from "firebase/firestore";
  import { db, storage } from "/src/config.js";
  import Errors from "/src/Component/_Errors.svelte";
  import { ref, uploadBytes } from 'firebase/storage';
  import {generateUUID} from "../helpers/uuid.js";
  import {getImageProductUrl} from "../helpers/helperProducts.js";

  export let popup;
  export let updateProducts;

  let name;
  let description;
  let price;
  let uuid = generateUUID()
  let selectedFile;
  let errors = [];

  async function handleSubmit() {
    if (!selectedFile || !name || !description || !price) {
      errors = ['Remplissez tous les inputs'];
      return;
    }
    const fileExtension = selectedFile.name.split('.').pop();
    const fileName = uuid + '.' + fileExtension
    const newProduct = {
      name,
      description,
      price,
      fileName
    };



    const storageRef = ref(storage, 'images/' + fileName);
    try {
      await uploadBytes(storageRef, selectedFile);
    } catch (error) {
      errors = [error]
      console.error('Error uploading file:', error);
    }

    try {
      const docRef = await addDoc(collection(db, 'product'), newProduct);
      const productDoc = await getDoc(doc(db, 'product', docRef.id));
      const imageProductUrl = await getImageProductUrl(productDoc.data())
      updateProducts({...productDoc.data(), id: productDoc.id, imageProductUrl: imageProductUrl});
      displayPopup();
    } catch (error) {
      errors = [error]
      console.error('Error adding product: ', error);
    }
  }

  function displayPopup() {
    popup = !popup;
  }


  function handleFileInput(event) {
    selectedFile = event.target.files[0];
  }
</script>

<Errors {errors} />
<div class="fixed top-0 left-0 flex items-center justify-center h-screen bg-black bg-opacity-50">
    <form on:submit={handleSubmit}
          class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <div class="flex flex-col w-3/4 p-8 bg-white rounded">
            <label for="file" class="text-[#646D74]">File</label>
            <input id="file" type="file" accept="image/*" on:change={handleFileInput} />
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
