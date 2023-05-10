import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session) {
		throw redirect(302, '/protected');
	}
};

export const actions: Actions = {
	signup: async function ({ request, locals }) {
		const body = Object.fromEntries(await request.formData());
		if (body.password.length < 6) {
			return fail(500, {
				error: 'Password must be at least 6 characters'
			});
		}
		if (body.password != body.confirmPassword) {
			return fail(500, {
				error: `Passwords don't match`
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
			return fail(500, {
				error: 'Server error. Please try again later'
			});
		}
		throw redirect(302, '/protected');
	},
	login: async function ({ request, locals, url }) {
		const provider = url.searchParams.get('provider');
		if (provider) {
			if (provider != 'google') {
				return fail(400, {
					error: 'Provider not supported'
				});
			}
			const { data, error: err } = await locals.supabase.auth.signInWithOAuth({
				provider: provider
			});
			if (err) {
				return fail(400, {
					error: 'Something went wrong'
				});
			}

			throw redirect(302, data.url);
		}
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
		throw redirect(302, '/protected');
	}
};
