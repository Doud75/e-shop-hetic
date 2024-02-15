
import {collection, getDocs} from "firebase/firestore";
import {db} from "../config.js";

export async function getProducts() {
  const products = []
  const querySnapshot = await getDocs(collection(db, 'product'))
  querySnapshot.forEach(doc => {
    products.push({...doc.data(), id: doc.id})
  })
  return {
    products
  }
}
