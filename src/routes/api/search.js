export const get = async ( field ) => {
    const query = field.query.toString().split( '=' )[1];
    if ( query.length === 0 ) return { body: { data: null } };

    const res = await fetch( `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${ query }&search_simple=1&json=1`);
    const data = await res.json();

    return { body: { results: data.products } };
}