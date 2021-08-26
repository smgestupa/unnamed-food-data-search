<script>
    import { fade } from 'svelte/transition';
    import { food_data } from '../stores/results.js';
    import Loading from './components/Loading.svelte';
    import NoResults from './components/NoResults.svelte';
    import FirstTime from './components/FirstTime.svelte';

    let search_inquiry = '', lastSearch_inquiry = '';
    let hasResults = false, firstSearch = true;

    const no_image = '/missing-image.jpg';

    const search = async ( food ) => {
        if ( food.length === 0 ) return alert( 'lmao' );

        firstSearch = false;
        lastSearch_inquiry = search_inquiry;

        const regex = food.trim().replace( / /g, '+' );
        const res = await fetch( `./api/search?food=${ regex }` );
        const data = await res.json();

        if ( data.results.length === 0 ) return hasResults = false;

        $food_data = data.results;
        hasResults = true;
    }
</script>

<div class="flex justify-center bg-gray-800" style="min-height: 100vh">
    <div class="mt-16">
        <!-- PAGE TITLE -->
        <div class="mt-5 text-center">
            <h1 class="text-white text-4xl">
                Unnamed Food Data Search
            </h1>
            <h3 class="text-gray-300 text-lg mt-1.5">
                Powered by <a class='text-green-600' href="https://world.openfoodfacts.org">Open Food Facts</a>' API
            </h3>
        </div>
        <!-- /PAGE TITLE -->
        <!-- SEARCH BAR -->
        <div class="mt-20 text-center">
            <!-- SEARCH BAR ICON -->
            <i class="text-gray-400 absolute translate-x-5 translate-y-5 fas fa-search text-2xl"></i>
            <!-- /SEARCH BAR ICON -->
            <input class='pl-14 rounded-full w-custom h-16 outline-none' type="text" placeholder="Search here!" bind:value={ search_inquiry } />
            <div class="mt-8 flex justify-center">
                <button class="mx-2.5 rounded-lg bg-gray-200 px-16 py-2 hover:bg-gray-300 duration-300" on:click={ search( search_inquiry ) }>Search</button>
                <button class="mx-2.5 rounded-lg bg-gray-200 px-10 py-2 hover:bg-gray-300 duration-300">Random Food</button>
            </div>
        </div>
        <!-- /SEARCH BAR -->
        <!-- RESULTS -->
        <div class="mt-16">
            { #if firstSearch }
                <FirstTime />
            { :else }
                { #await search( lastSearch_inquiry ) }
                    <Loading />
                { :then _ }
                    { #if !hasResults && !firstSearch }
                        <NoResults term={ lastSearch_inquiry } />
                    { :else if hasResults && !firstSearch }
                        { #each $food_data as food }
                            <!--{ #each test as food }-->
                            <div class="bg-gray-200 my-7 rounded-lg" in:fade="{ { duration: 1000 } }" >
                                <div class="flex">
                                    <div class="my-2.5 mx-3">
                                        <!-- PRODUCT LOGO -->
                                        { #if food.image_url === '' || typeof food.image_url === 'undefined' }
                                            <img class='rounded-lg' style='width: 25rem; height: 17rem;' src={ no_image } alt="">
                                        { :else }
                                            <img class='rounded-lg' style='width: 25rem; height: 17rem;' src={ food.image_url } alt="">
                                        { /if }
                                        <!-- /PRODUCT LOGO -->
                                        <div>
                                            <div class="mt-3">
                                                <!-- INGREDIENTS TITLE -->
                                                <h1 class="text-3xl">
                                                    Ingredients
                                                </h1>
                                                <!-- /INGREDIENTS TITLE -->
                                                <h3 class="mt-1.5 text-sm">
                                                    → Ingredients are listed in order of importance (quantity).
                                                </h3>
                                            </div>
                                            <!-- INGREDIENTS -->
                                            <div style="width: 25rem">
                                                <!-- INGREDIENTS LIST -->
                                                <div class="mt-2.5">
                                                    <h1 class="font-bold">
                                                        Ingredients list:
                                                    </h1>
                                                    <span class="mt-0.5">
                                                        { #if food.ingredients_text_en !== '' }
                                                            { food.ingredients_text_en }
                                                        { :else if food.ingredients_text_fr !== '' }
                                                            { food.ingredients_text_fr }
                                                        { :else }
                                                            ? ? ?
                                                        { /if }
                                                    </span>
                                                </div>
                                                <!-- /INGREDIENTS LIST -->
                                                <!-- SUBSTANCES OR PRODUCTS... -->
                                                <div class="mt-3">
                                                    <h1 class="font-bold">
                                                        Substances or products causing allergies or intolerances:
                                                    </h1>
                                                    <span class="mt-0.5">
                                                        { #if food.allergens !== '' }
                                                            { food.allergens.replace( /,/g, ', ' ).replace( /en:/g, '' ).replace( /fr:/g, '' ) }
                                                        { :else }
                                                            ? ? ?
                                                        { /if }
                                                    </span>
                                                </div>
                                                <!-- /SUBSTANCES OR PRODUCTS... -->
                                            </div>
                                            <!-- /INGREDIENTS TITLE -->
                                        </div>
                                        <!-- /INGREDIENTS -->
                                    </div>
                                    <div class="my-3 ml-1.5 mr-1">
                                        <!-- PRODUCT TITLE -->
                                        <h1 class="text-3xl">
                                            { #if food.abbreviated_product_name !== '' && typeof food.abbreviated_product_name !== 'undefined' }
                                                { food.abbreviated_product_name }
                                            { :else if food.abbreviated_product_name_fr !== '' && typeof food.abbreviated_product_name_fr !== 'undefined' }
                                                { food.abbreviated_product_name_fr }
                                            { :else if food.product_name_en !== '' }
                                                { food.product_name_en }
                                            { :else if food.product_name_fr !== '' }
                                                { food.product_name_fr }
                                            { :else }
                                                ? ? ?
                                            { /if }
                                        </h1>
                                        <h3 class="mt-1.5 text-md font-bold">
                                            Serving Size:
                                            <span class="font-normal">
                                                { #if food.serving_quantity !== '' }
                                                    { food.serving_quantity }
                                                { :else }
                                                    ? ? ?
                                                { /if }
                                                g
                                            </span>
                                        </h3>
                                        <h3 class="mt-1.5 text-md">
                                            Barcode:
                                            { #if food.id !== '' }
                                                { food._id }
                                            { :else }
                                                ? ? ?
                                            { /if }
                                            (EAN / EAN-13)
                                        </h3>
                                        <!-- /PRODUCT TITLE -->
                                        <!-- PRODUCT CHARACTERISTICS -->
                                        <div class="mt-10" style="width: 30rem;">
                                            <!-- CHARACTERISTICS TITLE -->
                                            <h1 class="text-2xl">
                                                Product Characteristics
                                            </h1>
                                            <!-- /CHARACTERISTICS TITLE -->
                                            <!-- QUANTITY -->
                                            <div class="mt-3 mb-5">
                                                <h3 class="font-bold">
                                                    Quantity:
                                                    <span class="font-normal">
                                                        { #if food.product_quantity !== '' }
                                                            { food.product_quantity }
                                                        { :else }
                                                            ? ? ?
                                                        { /if }
                                                     g</span>
                                                </h3>
                                            </div>
                                            <!-- /QUANTITY -->
                                            <!-- PACKAGING -->
                                            <div class="mt-3 mb-5">
                                                <h3 class="font-bold">
                                                    Packaging:
                                                    <span class="font-normal">
                                                        { #if typeof food.packaging !== 'undefined' }
                                                            { #if food.packaging !== '' }
                                                                { food.packaging.replace( /,/g, ', ' ).replace( /en:/g, '' ).replace( /fr:/g, '' ) }
                                                            { /if }
                                                        { :else }
                                                            ? ? ?
                                                        { /if }
                                                    </span>
                                                </h3>
                                            </div>
                                            <!-- /PACKAGING -->
                                            <!-- BRANDS -->
                                            <div class="mt-3 mb-5">
                                                <h3 class="font-bold">
                                                    Brands:
                                                    <span class="font-normal">
                                                        { #if food.brands !== '' }
                                                            { food.brands.replace( /,/g, ', ' ).replace( /en:/g, '' ).replace( /fr:/g, '' ) }
                                                        { :else }
                                                            ? ? ?
                                                        { /if }
                                                    </span>
                                                </h3>
                                            </div>
                                            <!-- /BRANDS -->
                                            <!-- CATEGORIES -->
                                            <div class="mt-3 mb-5">
                                                <h3 class="font-bold">
                                                    Categories:
                                                    <span class="font-normal">
                                                        { #if typeof food.categories !== 'undefined' }
                                                            { #if food.categories !== '' }
                                                                { food.categories.replace( /,/g, ', ' ).replace( /en:/g, '' ).replace( /fr:/g, '' ) }
                                                            { /if }
                                                        { :else }
                                                            ? ? ?
                                                        { /if }
                                                    </span>
                                                </h3>
                                            </div>
                                            <!-- /CATEGORIES -->
                                            <!-- LABELS, CERTIFICATIONS, AWARDS -->
                                            <div class="mt-3 mb-5">
                                                <h3 class="font-bold">
                                                    Labels, Certifications, Awards:
                                                    <span class="font-normal">
                                                        { #if typeof food.labels !== 'undefined' }
                                                            { #if food.labels !== '' }
                                                                { food.labels.replace( /,/g, ', ' ).replace( /en:/g, '' ).replace( /fr:/g, '' ) }
                                                            { /if }
                                                        { :else }
                                                            ? ? ?
                                                        { /if }
                                                    </span>
                                                </h3>
                                            </div>
                                            <!-- /LABELS, CERTIFICATIONS, AWARDS -->
                                            <!-- LINK TO THE PRODUCTS... -->
                                            <div class="mt-3 mb-5">
                                                <h3 class="font-bold">
                                                    Link to the product page on the official site of the producer:
                                                    <br>
                                                    { #if food.link !== '' }
                                                        <span class="font-normal text-blue-500 hover:text-blue-600 duration-300">
                                                            <a href={ food.link }>
                                                                { food.link }
                                                            </a>
                                                        </span>
                                                    { :else }
                                                        <span class="font-normal">
                                                            ? ? ?
                                                        </span>
                                                    { /if }
                                                </h3>
                                            </div>
                                            <!-- /LINK TO THE PRODUCTS... -->
                                            <!-- STORES -->
                                            <div class="mt-3 mb-5">
                                                <h3 class="font-bold">
                                                    Stores:
                                                    <span class="font-normal">
                                                        { #if typeof food.stores !== 'undefined' }
                                                            { #if food.stores !== '' }
                                                                { food.stores.replace( /,/g, ', ' ) }
                                                            { /if }
                                                        { :else }
                                                            ? ? ?
                                                        { /if }
                                                    </span>
                                                </h3>
                                            </div>
                                            <!-- /STORES -->
                                            <!-- COUNTRIES WHERE SOLD -->
                                            <div class="mt-3 mb-5">
                                                <h3 class="font-bold">
                                                    Countries where sold:
                                                    <span class="font-normal">
                                                        { #if typeof food.countries !== 'undefined' }
                                                            { #if food.countries !== '' }
                                                                { food.countries.replace( /,/g, ', ' ) }
                                                            { /if }
                                                        { :else }
                                                            ? ? ?
                                                        { /if }
                                                    </span>
                                                </h3>
                                            </div>
                                            <!-- /COUNTRIES WHERE SOLD -->
                                        </div>
                                        <!-- /PRODUCT CHARACTERISTICS -->
                                    </div>
                                </div>
                                <!-- NUTRITION FACTS -->
                                <div class="mt-5 mx-3">
                                    <h1 class="text-3xl">
                                        Nutrition Facts
                                    </h1>
                                    <div class="mt-3 mx-20 flex">
                                        <!-- NUTRISCORE -->
                                        <div class="mt-2.5">
                                            <h3 class="text-lg">
                                                NutriScore color nutrition grade
                                            </h3>
                                            <!-- NUTRISCORE SCORE -->
                                            <div class="mt-2.5 flex items-center">
                                                { #if food.ecoscore_grade === 'a' }
                                                    <!-- NUTRISCORE SCORE A -->
                                                    <span class="bg-green-800 border-4 border-gray-200 text-6xl rounded-full text-white font-bold px-2.5 py-5">A</span>
                                                    <span class="bg-green-500 text-5xl text-white text-opacity-50 font-bold px-2.5 py-3">B</span>
                                                    <span class="bg-yellow-400 text-5xl text-white text-opacity-50 font-bold px-2.5 py-3">C</span>
                                                    <span class="bg-yellow-600 text-5xl text-white text-opacity-50 font-bold px-2.5 py-3">D</span>
                                                    <span class="bg-red-600 text-5xl text-white text-opacity-50 font-bold px-3 py-3">E</span>
                                                    <!-- /NUTRISCORE SCORE A-->
                                                { :else if food.ecoscore_grade === 'b' }
                                                    <!-- NUTRISCORE SCORE B -->
                                                    <span class="bg-green-800 text-5xl text-white text-opacity-50 font-bold px-2.5 py-3">A</span>
                                                    <span class="bg-green-500 border-4 border-gray-200 text-6xl rounded-full text-white font-bold px-2.5 py-5">B</span>
                                                    <span class="bg-yellow-400 text-5xl text-white text-opacity-50 font-bold px-2.5 py-3">C</span>
                                                    <span class="bg-yellow-600 text-5xl text-white text-opacity-50 font-bold px-2.5 py-3">D</span>
                                                    <span class="bg-red-600 text-5xl text-white font-bold text-opacity-50 px-3 py-3">E</span>
                                                    <!-- /NUTRISCORE SCORE B -->
                                                { :else if food.ecoscore_grade === 'c' }
                                                    <!-- NUTRISCORE SCORE C -->
                                                    <span class="bg-green-800 text-5xl text-white text-opacity-50 font-bold px-2.5 py-3">A</span>
                                                    <span class="bg-green-500 text-5xl text-white text-opacity-50 font-bold px-2.5 py-3">B</span>
                                                    <span class="bg-yellow-400 border-4 border-gray-200 text-6xl rounded-full text-white font-bold px-2.5 py-5">C</span>
                                                    <span class="bg-yellow-600 text-5xl text-white text-opacity-50 font-bold px-2.5 py-3">D</span>
                                                    <span class="bg-red-600 text-5xl text-white font-bold text-opacity-50 px-3 py-3">E</span>
                                                    <!-- /NUTRISCORE SCORE C -->
                                                { :else if food.ecoscore_grade === 'd' }
                                                    <!-- NUTRISCORE SCORE D -->
                                                    <span class="bg-green-800 text-5xl text-white text-opacity-50 font-bold px-2.5 py-3">A</span>
                                                    <span class="bg-green-500 text-5xl text-white text-opacity-50 font-bold px-2.5 py-3">B</span>
                                                    <span class="bg-yellow-400 text-5xl text-white text-opacity-50 font-bold px-2.5 py-3">C</span>
                                                    <span class="bg-yellow-600 border-4 border-gray-200 text-6xl rounded-full text-white font-bold px-2.5 py-5">D</span>
                                                    <span class="bg-red-600 text-5xl text-white font-bold text-opacity-50 px-3 py-3">E</span>
                                                    <!-- /NUTRISCORE SCORE D -->
                                                { :else if food.ecoscore_grade === 'e' }
                                                    <!-- NUTRISCORE SCORE E -->
                                                    <span class="bg-green-800 text-5xl text-white text-opacity-50 font-bold px-2.5 py-3">A</span>
                                                    <span class="bg-green-500 text-5xl text-white text-opacity-50 font-bold px-2.5 py-3">B</span>
                                                    <span class="bg-yellow-400 text-5xl text-white text-opacity-50 font-bold px-2.5 py-3">C</span>
                                                    <span class="bg-yellow-600 text-5xl text-white font-bold text-opacity-50 px-3 py-3">D</span>
                                                    <span class="bg-red-600 border-4 border-gray-200 text-6xl rounded-full text-white font-bold px-2.5 py-5">E</span>
                                                    <!-- /NUTRISCORE SCORE E -->
                                                { :else }
                                                    <!-- NO SCORE -->
                                                    <span class="bg-green-800 text-5xl text-white text-opacity-50 font-bold px-2.5 py-3">A</span>
                                                    <span class="bg-green-500 text-5xl text-white text-opacity-50 font-bold px-2.5 py-3">B</span>
                                                    <span class="bg-yellow-400 text-5xl text-white text-opacity-50 font-bold px-2.5 py-3">C</span>
                                                    <span class="bg-yellow-600 text-5xl text-white font-bold text-opacity-50 px-3 py-3">D</span>
                                                    <span class="bg-red-600 text-5xl text-white font-bold text-opacity-50 px-3 py-3">E</span>
                                                    <span class="bg-gray-700 border-4 border-gray-200 text-6xl rounded-full text-white font-bold px-2.5 py-5">?</span>
                                                    <!-- NO SCORE -->
                                                { /if }
                                            </div>
                                        </div>
                                        <!-- /NUTRISCORE -->
                                        <!-- NUTRIENT LEVELS -->
                                        <div class="ml-48 mt-2.5">
                                            <h1 class="text-lg">
                                                Nutrient levels for 100g
                                            </h1>
                                            <!-- NUTRIENT LEVELS QTY-->
                                            <div class="mt-2 ml-10">
                                                <!-- FAT QUANTITY -->
                                                <div class="my-3">
                                                    { #if food.nutrient_levels.fat === 'high' }
                                                        <i class="text-red-600 absolute fas fa-circle text-2xl -translate-x-8 translate-y-0.5"></i>
                                                        <p class="ml-1"><span class="font-bold">Fat</span> in high quantity</p>
                                                    { :else if food.nutrient_levels.fat === 'low' }
                                                        <i class="text-green-600 absolute fas fa-circle text-2xl -translate-x-8 translate-y-0.5"></i>
                                                        <p class="ml-1"><span class="font-bold">Fat</span> in low quantity</p>
                                                    { :else }
                                                        <i class="text-gray-600 absolute fas fa-circle text-2xl -translate-x-8 translate-y-0.5"></i>
                                                        <p class="ml-1"><span class="font-bold">Fat</span> in unknown quantity</p>
                                                    { /if }
                                                </div>
                                                <!-- /FAT QUANTITY -->
                                                <!-- SATURATED FAT QUANTITY -->
                                                <div class="my-3">
                                                    { #if Object.values( food.nutrient_levels )[2] === 'high' }
                                                        <i class="text-red-600 absolute fas fa-circle text-2xl -translate-x-8 translate-y-0.5"></i>
                                                        <p class="ml-1"><span class="font-bold">Saturated Fat</span> in high quantity</p>
                                                    { :else if Object.values( food.nutrient_levels )[2] === 'low' }
                                                        <i class="text-green-600 absolute fas fa-circle text-2xl -translate-x-8 translate-y-0.5"></i>
                                                        <p class="ml-1"><span class="font-bold">Saturated Fat</span> in low quantity</p>
                                                    { :else }
                                                        <i class="text-gray-600 absolute fas fa-circle text-2xl -translate-x-8 translate-y-0.5"></i>
                                                        <p class="ml-1"><span class="font-bold">Saturated Fat</span> in unknown quantity</p>
                                                    { /if }
                                                </div>
                                                <!-- /SATURATED FAT QUANTITY -->
                                                <!-- SUGARS QUANTITY -->
                                                <div class="my-3">
                                                    { #if food.nutrient_levels.sugars === 'high' }
                                                        <i class="text-red-600 absolute fas fa-circle text-2xl -translate-x-8 translate-y-0.5"></i>
                                                        <p class="ml-1"><span class="font-bold">Sugars</span> in high quantity</p>
                                                    { :else if food.nutrient_levels.sugars === 'low' }
                                                        <i class="text-green-600 absolute fas fa-circle text-2xl -translate-x-8 translate-y-0.5"></i>
                                                        <p class="ml-1"><span class="font-bold">Sugars</span> in low quantity</p>
                                                    { :else }
                                                        <i class="text-gray-600 absolute fas fa-circle text-2xl -translate-x-8 translate-y-0.5"></i>
                                                        <p class="ml-1"><span class="font-bold">Sugars</span> in unknown quantity</p>
                                                    { /if }
                                                </div>
                                                <!-- /SUGARS QUANTITY -->
                                                <!-- SALT QUANTITY -->
                                                <div class="my-3">
                                                    { #if food.nutrient_levels.salt === 'high' }
                                                        <i class="text-red-600 absolute fas fa-circle text-2xl -translate-x-8 translate-y-0.5"></i>
                                                        <p class="ml-1"><span class="font-bold">Salt</span> in high quantity</p>
                                                    { :else if food.nutrient_levels.salt === 'low' }
                                                        <i class="text-green-600 absolute fas fa-circle text-2xl -translate-x-8 translate-y-0.5"></i>
                                                        <p class="ml-1"><span class="font-bold">Salt</span> in low quantity</p>
                                                    { :else }
                                                        <i class="text-gray-600 absolute fas fa-circle text-2xl -translate-x-8 translate-y-0.5"></i>
                                                        <p class="ml-1"><span class="font-bold">Salt</span> in unknown quantity</p>
                                                    { /if }
                                                </div>
                                                <!-- /SALT QUANTITY -->
                                            </div>
                                            <!-- /NUTRIENT LEVELS QTY -->
                                        </div>
                                        <!-- /NUTRIENT LEVELS -->
                                    </div>
                                </div>
                                <!-- /NUTRITION FACTS -->
                                <div class="text-right my-5 pb-2 mr-3">
                                    <a class='text-green-500 hover:text-green-600 duration-300' href="https://world.openfoodfacts.org/product/{ food._id }">
                                        <i><span class="text-lg">»</span> Click here to check the full page!</i>
                                    </a>
                                </div>
                            </div>
                        { /each }
                    { /if }
                { /await }
            { /if }
        </div>
        <!-- /RESULTS -->
    </div>
</div>

<style>
    .w-custom {
        width: 48rem;
    }
</style>