import type { RequestEvent } from '@sveltejs/kit';

export const handleAuthRedirect = function (
	event: RequestEvent,
	status: 'failure' | 'success' = 'failure',
	message = ''
) {
	const fromUrl = event.url.pathname + event.url.search;
	return `/auth?redirectTo=${fromUrl}&message=${message}&status=${status}`;
};
