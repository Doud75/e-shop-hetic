<script>
	import Errors from '/src/Component/_Errors.svelte';
	import { auth } from '/src/config.js';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { goto } from '$app/navigation';

	let email;
	let password;
	let errors = [];
	async function handleSubmit() {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				localStorage.setItem('user', JSON.stringify(user));
				goto('/app');
			})
			.catch((error) => {
				errors = [error];
				console.error('Error fetching search results:', error);
			});
	}
</script>

<div class="mx-auto w-10/12">
	<Errors {errors} />
	<div class="my-4 text-center">
		<p class="text-[#646D74]">
			Simple client ? <a class="text-[#319795]" href="/">Voir la liste de nos produits</a>
		</p>
	</div>
	<form on:submit={handleSubmit}>
		<div class="h-[95vh] flex-col flex justify-center">
			<h1 class="mx-auto text-[#319795] text-2xl mb-6">Connectez-vous</h1>
			<input
				id="email"
				type="email"
				required
				bind:value={email}
				placeholder="Adresse e-mail"
				class="rounded-lg w-full border-2 py-1 px-2 mb-4"
			/>
			<input
				id="password"
				type="password"
				required
				bind:value={password}
				placeholder="Mot de passe"
				class="rounded-lg border-2 w-full py-1 px-2"
			/>
		</div>

		<div class=" absolute bottom-8 w-10/12 text-center">
			<button class="mb-6 rounded-lg w-full bg-[#319795] text-white py-2">Valider</button>
			<div>
				<p class="text-[#646D74]">Pas encore de compte ?</p>
				<a class="text-[#319795]" href="/auth/signup">Enregistrez vous</a>
			</div>
		</div>
	</form>
</div>
