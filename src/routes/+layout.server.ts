import type { LayoutServerLoad } from './$types';

export const load = async function ({ url, locals }) {
	return {
		url: url.pathname,
		session: locals.session
	};
} satisfies LayoutServerLoad;
