import type { RequestHandler } from './$types';
import { API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { stripe } from '$lib/server/stripe';
import { prisma } from '$lib/server/prisma';
import { UserSchema } from '$lib/schemas/generated';

export const POST: RequestHandler = async ({ url, request }) => {
	if (url.searchParams.get('API_KEY') != API_KEY) {
		return json({ error: 'Invalid api key' }, { status: 401 });
	}
	const body = await request.json();
	const parsedBody = UserSchema.safeParse(body.record);
	if (!parsedBody.success) {
		return json({ error: 'Invalid body' }, { status: 400 });
	}
	const user = parsedBody.data;
	const stripeCustomer = await stripe.customers.create({
		email: user.email
	});
	try {
		await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				customerId: stripeCustomer.id
			}
		});
	} catch (err) {
		return json({ error: 'Failed to update user' }, { status: 500 });
	}
	return json({ success: true }, { status: 200 });
};
