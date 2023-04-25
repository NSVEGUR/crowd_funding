export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","apple-touch-icon.png","favicon-16x16.png","favicon-32x32.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.f18d00ec.js","imports":["_app/immutable/entry/start.f18d00ec.js","_app/immutable/chunks/index.aaf5b9ee.js","_app/immutable/chunks/singletons.e7ffdcc0.js","_app/immutable/chunks/index.fe92fa36.js","_app/immutable/chunks/parse.d12b0d5b.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.6047d63f.js","imports":["_app/immutable/entry/app.6047d63f.js","_app/immutable/chunks/supabase.91c518b3.js","_app/immutable/chunks/index.aaf5b9ee.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js'),
			() => import('../output/server/nodes/4.js'),
			() => import('../output/server/nodes/5.js'),
			() => import('../output/server/nodes/6.js'),
			() => import('../output/server/nodes/7.js'),
			() => import('../output/server/nodes/8.js'),
			() => import('../output/server/nodes/9.js'),
			() => import('../output/server/nodes/10.js'),
			() => import('../output/server/nodes/11.js'),
			() => import('../output/server/nodes/12.js')
		],
		routes: [
			{
				id: "/(app)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/api/webhooks/create-stripe-customer",
				pattern: /^\/api\/webhooks\/create-stripe-customer\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/webhooks/create-stripe-customer/_server.ts.js')
			},
			{
				id: "/api/webhooks/fulfill-order",
				pattern: /^\/api\/webhooks\/fulfill-order\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/webhooks/fulfill-order/_server.ts.js')
			},
			{
				id: "/auth",
				pattern: /^\/auth\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 9 },
				endpoint: null
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 10 },
				endpoint: null
			},
			{
				id: "/payments/cancel",
				pattern: /^\/payments\/cancel\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 11 },
				endpoint: null
			},
			{
				id: "/payments/success",
				pattern: /^\/payments\/success\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(app)/(protected)/personal",
				pattern: /^\/personal\/?$/,
				params: [],
				page: { layouts: [0,2,3], errors: [1,,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(app)/(protected)/personal/[slug]",
				pattern: /^\/personal\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,3], errors: [1,,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(app)/(protected)/start",
				pattern: /^\/start\/?$/,
				params: [],
				page: { layouts: [0,2,3], errors: [1,,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(app)/[slug]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2], errors: [1,,], leaf: 8 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
