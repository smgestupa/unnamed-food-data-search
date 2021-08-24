/** @type {import('@sveltejs/kit').Config} */
import netlify from '@sveltejs/adapter-nelify'
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
		adapter: netlify()
	}
};

export default config;
