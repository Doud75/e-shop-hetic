import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config.js';

export async function getUsers() {
	let users = [];
	const querySnapshot = await getDocs(collection(db, 'users'));
	querySnapshot.forEach((doc) => {
		users.push({ ...doc.data(), id: doc.id });
	});
	return users;
}
