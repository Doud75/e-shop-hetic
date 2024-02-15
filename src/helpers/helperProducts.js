import {collection, getDocs} from "firebase/firestore";
import {db, storage} from "../config.js";
import {getDownloadURL, ref} from "firebase/storage";

export async function getProducts() {
  let products = []
  const querySnapshot = await getDocs(collection(db, 'product'))
  for (const doc of querySnapshot.docs) {
    const imageUrl = await getImageProductUrl(doc.data())
    products.push({...doc.data(), id: doc.id, imageProductUrl: imageUrl})
  }
  return products
}

export async function getImageProductUrl(product) {
  try {
    return await getDownloadURL(ref(storage, 'images/' + product.fileName));
  } catch (error) {
    console.error('Error getting image URL:', error);
  }
}
