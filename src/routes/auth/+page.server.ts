import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { handleAuthRedirect } from '$lib/utils/redirect';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session) {
		throw redirect(302, '/personal');
	}
};

export const actions: Actions = {
	signup: async function (event) {
		const { request, locals } = event;
		const body = Object.fromEntries(await request.formData());
		if (body.password.length < 6) {
			return fail(500, {
				error: 'Password must be at least 6 characters'
			});
		}
		const { error: err } = await locals.supabase.auth.signUp({
			email: body.email as string,
			password: body.password as string
		});
		if (err) {
			if (err.status >= 400 && err.status <= 499) {
				return fail(400, {
					error: 'Invalid password or email'
				});
			}
			console.log(err);
			return fail(500, {
				error: 'Server error. Please try again later'
			});
		}
		throw redirect(302, handleAuthRedirect(event, 'success', 'Please confirm your mail to login'));
	},
	login: async function ({ request, locals }) {
		const body = Object.fromEntries(await request.formData());
		const { error: err } = await locals.supabase.auth.signInWithPassword({
			email: body.email as string,
			password: body.password as string
		});
		if (err) {
			if (err.status >= 400 && err.status <= 499) {
				return fail(400, {
					error: 'Invalid password or email'
				});
			}
			return fail(500, {
				error: 'Server error. Please try again later'
			});
		}
		throw redirect(302, '/personal');
	}
};
