import '$lib/supabase';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';
import { API_KEY, DOMAIN_ADDRESS } from '$env/static/private';

export const handle: Handle = async function ({ event, resolve }) {
	const { session, supabaseClient } = await getSupabase(event);
	event.locals.supabase = supabaseClient;
	event.locals.session = session;
	return resolve(event);
};

export const handleError = (async ({ error }) => {
	console.error(error);
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
