/** @type {import('./$types').PageLoad} */

import { getProducts } from '../helpers/helperProducts';

export async function load() {
	let products = await getProducts();
	return {
		products
	};
}
