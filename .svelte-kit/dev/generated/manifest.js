const c = [
	() => import("..\\..\\..\\src\\routes\\__layout.svelte"),
	() => import("..\\components\\error.svelte"),
	() => import("..\\..\\..\\src\\routes\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\components\\FirstTime.svelte"),
	() => import("..\\..\\..\\src\\routes\\components\\NoResults.svelte"),
	() => import("..\\..\\..\\src\\routes\\components\\Loading.svelte"),
	() => import("..\\..\\..\\src\\routes\\components\\Footer.svelte"),
	() => import("..\\..\\..\\src\\routes\\components\\Header.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/components/FirstTime.svelte
	[/^\/components\/FirstTime\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/components/NoResults.svelte
	[/^\/components\/NoResults\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/components/Loading.svelte
	[/^\/components\/Loading\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/components/Footer.svelte
	[/^\/components\/Footer\/?$/, [c[0], c[6]], [c[1]]],

	// src/routes/components/Header.svelte
	[/^\/components\/Header\/?$/, [c[0], c[7]], [c[1]]],

	// src/routes/api/search.js
	[/^\/api\/search\/?$/]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];