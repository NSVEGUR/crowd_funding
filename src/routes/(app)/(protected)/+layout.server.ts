import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = async function (event) {
	if (!event.locals.session) {
		throw redirect(302, '/auth');
	}
	return {
		session: await getServerSession(event)
	};
} satisfies LayoutServerLoad;
