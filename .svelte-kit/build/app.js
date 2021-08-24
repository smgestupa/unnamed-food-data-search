import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths, assets } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"/favicon.png\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t" + head + "\n\t</head>\n\t<body>\n\t\t<div id=\"svelte\">" + body + "</div>\n\t</body>\n</html>\n";

let options = null;

const default_settings = { paths: {"base":"","assets":""} };

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings = default_settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	const hooks = get_hooks(user_hooks);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: assets + "/_app/start-8065b2e0.js",
			css: [assets + "/_app/assets/start-d5b4de3e.css"],
			js: [assets + "/_app/start-8065b2e0.js",assets + "/_app/chunks/vendor-9c9dd381.js"]
		},
		fetched: undefined,
		floc: false,
		get_component_path: id => assets + "/_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: (error, request) => {
			hooks.handleError({ error, request });
			error.stack = options.get_stack(error);
		},
		hooks,
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		prerender: true,
		read: settings.read,
		root,
		service_worker: null,
		router: true,
		ssr: true,
		target: "#svelte",
		template,
		trailing_slash: "never"
	};
}

const d = decodeURIComponent;
const empty = () => ({});

const manifest = {
	assets: [{"file":"favicon.png","size":1571,"type":"image/png"}],
	layout: "src/routes/__layout.svelte",
	error: ".svelte-kit/build/components/error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/components\/FirstTime\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/components/FirstTime.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/components\/NoResults\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/components/NoResults.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/components\/Loading\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/components/Loading.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/components\/Footer\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/components/Footer.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/components\/Header\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/components/Header.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'endpoint',
						pattern: /^\/api\/search\/?$/,
						params: empty,
						load: () => import("..\\..\\src\\routes\\api\\search.js")
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, resolve }) => resolve(request)),
	handleError: hooks.handleError || (({ error }) => console.error(error.stack)),
	serverFetch: hooks.serverFetch || fetch
});

const module_lookup = {
	"src/routes/__layout.svelte": () => import("..\\..\\src\\routes\\__layout.svelte"),".svelte-kit/build/components/error.svelte": () => import("./components\\error.svelte"),"src/routes/index.svelte": () => import("..\\..\\src\\routes\\index.svelte"),"src/routes/components/FirstTime.svelte": () => import("..\\..\\src\\routes\\components\\FirstTime.svelte"),"src/routes/components/NoResults.svelte": () => import("..\\..\\src\\routes\\components\\NoResults.svelte"),"src/routes/components/Loading.svelte": () => import("..\\..\\src\\routes\\components\\Loading.svelte"),"src/routes/components/Footer.svelte": () => import("..\\..\\src\\routes\\components\\Footer.svelte"),"src/routes/components/Header.svelte": () => import("..\\..\\src\\routes\\components\\Header.svelte")
};

const metadata_lookup = {"src/routes/__layout.svelte":{"entry":"pages/__layout.svelte-09603879.js","css":["assets/pages/__layout.svelte-b8816561.css"],"js":["pages/__layout.svelte-09603879.js","chunks/vendor-9c9dd381.js","pages/components/Header.svelte-6a05e17a.js","pages/components/Footer.svelte-33e94e1a.js"],"styles":[]},".svelte-kit/build/components/error.svelte":{"entry":"error.svelte-83d651d1.js","css":[],"js":["error.svelte-83d651d1.js","chunks/vendor-9c9dd381.js"],"styles":[]},"src/routes/index.svelte":{"entry":"pages/index.svelte-f2bb151f.js","css":["assets/pages/index.svelte-94a54a48.css"],"js":["pages/index.svelte-f2bb151f.js","chunks/vendor-9c9dd381.js","pages/components/Loading.svelte-0a4edde9.js","pages/components/NoResults.svelte-62865183.js","pages/components/FirstTime.svelte-ccd94e04.js"],"styles":[]},"src/routes/components/FirstTime.svelte":{"entry":"pages/components/FirstTime.svelte-ccd94e04.js","css":[],"js":["pages/components/FirstTime.svelte-ccd94e04.js","chunks/vendor-9c9dd381.js"],"styles":[]},"src/routes/components/NoResults.svelte":{"entry":"pages/components/NoResults.svelte-62865183.js","css":[],"js":["pages/components/NoResults.svelte-62865183.js","chunks/vendor-9c9dd381.js"],"styles":[]},"src/routes/components/Loading.svelte":{"entry":"pages/components/Loading.svelte-0a4edde9.js","css":[],"js":["pages/components/Loading.svelte-0a4edde9.js","chunks/vendor-9c9dd381.js"],"styles":[]},"src/routes/components/Footer.svelte":{"entry":"pages/components/Footer.svelte-33e94e1a.js","css":[],"js":["pages/components/Footer.svelte-33e94e1a.js","chunks/vendor-9c9dd381.js"],"styles":[]},"src/routes/components/Header.svelte":{"entry":"pages/components/Header.svelte-6a05e17a.js","css":[],"js":["pages/components/Header.svelte-6a05e17a.js","chunks/vendor-9c9dd381.js"],"styles":[]}};

async function load_component(file) {
	const { entry, css, js, styles } = metadata_lookup[file];
	return {
		module: await module_lookup[file](),
		entry: assets + "/_app/" + entry,
		css: css.map(dep => assets + "/_app/" + dep),
		js: js.map(dep => assets + "/_app/" + dep),
		styles
	};
}

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender });
}