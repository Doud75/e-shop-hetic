<script>
  import Errors from "../../../Component/_Errors.svelte";
  import {doc, setDoc} from "firebase/firestore"
  import {auth} from "../../../config.js";
  import {db} from "../../../config.js";
  import {createUserWithEmailAndPassword} from "firebase/auth";
  import {goto} from "$app/navigation";

  let email;
  let password;
  let errors = [];

  async function handleSubmit() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('user', JSON.stringify(user))
        goto('/app')
      })
      .catch((error) => {
        errors = [error]
        console.error('Error fetching search results:', error);
      });
  }
</script>

<div class="mx-auto max-w-[600px] h-[95vh] flex flex-col justify-center">
    <Errors {errors}/>
	<div class="relative">

    <form on:submit={handleSubmit}>
      <div class="flex-col flex justify-center mb-6">
          <h1 class="mx-auto text-[#319795] text-2xl mb-6">Créer un compte</h1>
            <input 
              id="email" 
              type="email" 
              required bind:value={email} 
              placeholder="Adresse e-mail"
              class="rounded-lg border-2 w-full py-1 px-2 mb-4"
            >
            <input 
              id="password" 
              type="password" 
              required bind:value={password} 
              placeholder="Mot de passe"
              class="rounded-lg border-2 w-full py-1 px-2"
            >
        </div>

        <div class="bottom-8 text-center">
          <button class="mb-12 rounded-lg w-full bg-[#319795] text-white py-2">Valider</button>
            <div>
                <p class="text-[#646D74]">Déjà un compte ?</p>
                <a class="text-[#319795]" href="/auth/login">Connectez vous</a>
            </div>
        </div>
    </form>
</div>
</div>
