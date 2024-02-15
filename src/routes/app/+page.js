/** @type {import('./$types').PageLoad} */
import {getProducts} from "../../helpers/helperProducts.js";

export async function load() {
  let products = await getProducts();
  return {
    products
  }
}
