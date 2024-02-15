
import {collection, getDocs} from "firebase/firestore";
import {db, storage} from "../config.js";
import { getDownloadURL, ref } from "firebase/storage";

export async function getProducts() {
  let products = []
  const querySnapshot = await getDocs(collection(db, 'product'))
  querySnapshot.forEach(doc => {
    products.push({...doc.data(), id: doc.id})
  })
  return products
}


export async function getImageProductUrl(product) {
    let imageProductUrl = await getDownloadURL(ref(storage, 'images/' + product.fileName))
    return imageProductUrl
  }