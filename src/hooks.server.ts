import '$lib/supabase';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';
import { API_KEY, DOMAIN_ADDRESS } from '$env/static/private';
import { redirect, error } from '@sveltejs/kit';

export const handle: Handle = async function ({ event, resolve }) {
	const { session, supabaseClient } = await getSupabase(event);
	event.locals.supabase = supabaseClient;
	event.locals.session = session;
	if (event.url.pathname.startsWith('/protected')) {
		if (!session) {
			throw redirect(303, '/auth');
		}
	}
	if (event.url.pathname.startsWith('/protected') && event.request.method === 'POST') {
		if (!session) {
			throw error(401, { message: 'Authentication is required' });
		}
	}
	return resolve(event);
};

export const handleError = (async ({ error }) => {
	console.error(error);
	return {
		message: 'Whoops!',
		code: error ?? 'UNKNOWN'
	};
}) satisfies HandleServerError;

export const handleFetch = (async ({ request, fetch }) => {
	if (request.url.startsWith(DOMAIN_ADDRESS + '/api')) {
		request = new Request(
			request.url.replace(request.url, request.url + `/?API_KEY=${API_KEY}`),
			request
		);
	}
	return fetch(request);
}) satisfies HandleFetch;
