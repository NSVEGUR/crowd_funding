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
	try {
		const stripeUser = await prisma.stripeUser.findUnique({
			where: {
				email: user.email
			}
		});
		const newUser = await prisma.user.findUnique({
			where: {
				email: user.email
			}
		});
		if (!newUser) {
			return json({ error: 'Failed to update user' }, { status: 500 });
		}
		if (!stripeUser) {
			const stripeCustomer = await stripe.customers.create({
				email: user.email
			});
			await prisma.stripeUser.create({
				data: {
					id: stripeCustomer.id,
					email: user.email,
					userId: newUser.id
				}
			});
		} else {
			await prisma.stripeUser.update({
				where: {
					id: stripeUser.id
				},
				data: {
					userId: newUser.id
				}
			});
		}
	} catch (err) {
		return json({ error: 'Failed to update user' }, { status: 500 });
	}
	return json({ success: true }, { status: 200 });
};
