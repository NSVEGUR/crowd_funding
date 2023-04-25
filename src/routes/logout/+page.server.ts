import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { error: err } = await locals.supabase.auth.signOut();
	if (err) {
		throw error(500, 'Something went wrong in logging out');
	}
	throw redirect(303, '/auth');
};

export const actions = {
	default: async ({ locals }) => {
		const { error: err } = await locals.supabase.auth.signOut();
		if (err) {
			throw error(500, 'Something went wrong in logging out');
		}
		throw redirect(303, '/auth');
	}
} satisfies Actions;
