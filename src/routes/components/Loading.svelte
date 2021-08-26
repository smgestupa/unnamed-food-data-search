<script>
    import { fade } from 'svelte/transition';

    const loading_animation = 'assets/loading-animation.gif';
</script>

<div class='text-center mt-40' in:fade={ { duration: 1000 } }>
    <div class="text-gray-300">
        <img class='pointer-events-none mx-auto' src={ loading_animation } alt="#" width="200">
        <div class="mt-5">
            <h3 class="text-2xl">
                <i>Loading... now fetching the database!</i>
            </h3>
        </div>
    </div>
</div>