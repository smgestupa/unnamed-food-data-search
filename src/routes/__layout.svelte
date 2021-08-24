<script>
    import Header from './components/Header.svelte';
    import Footer from './components/Footer.svelte';
</script>

<svelte:head>
    <script defer src="https://use.fontawesome.com/releases/v5.15.3/js/all.js" integrity="sha384-haqrlim99xjfMxRP6EWtafs0sB1WKcMdynwZleuUSwJR0mDeRYbhtY+KPMr+JL6f" crossorigin="anonymous"></script>
</svelte:head>

<div>
    <Header />
    <slot />
    <Footer />
</div>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>