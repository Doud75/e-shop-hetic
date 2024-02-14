<script>
  export let errors = [];
  export let title = 'Une erreur est survenue !';
</script>

{#if errors && errors.length > 0}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">{title}</strong>
        <ul>
            {#each errors as error}
                <li class="block sm:inline">{error}</li>
            {/each}
        </ul>
    </div>
{/if}
