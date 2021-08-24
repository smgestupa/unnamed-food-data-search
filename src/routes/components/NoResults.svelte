<script>
    export let term = '';
    import { fade } from 'svelte/transition';
</script>

<div class='flex justify-center text-center mt-40' in:fade={ { duration: 1000 } }>
    <div class="text-gray-300">
        <i class="fas fa-exclamation-triangle text-9xl text-red-500"></i>
        <div class="mt-8">
            <h3 class="text-xl">
                Sorry! No results found using <span class="text-white">{ term } </span> from the database.
            </h3>
        </div>
    </div>
</div>