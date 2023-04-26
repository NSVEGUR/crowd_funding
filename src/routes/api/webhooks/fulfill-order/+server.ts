/* eslint-disable @typescript-eslint/no-explicit-any */
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { stripe } from '$lib/server/stripe';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request }) => {
	const payload = await request.text();
	const signature = request.headers.get('stripe-signature');
	let event;
	if (!payload || !signature) {
		return json({ error: 'Invalid body' }, { status: 400 });
	}
	try {
		event = stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET);
	} catch (err) {
		console.warn('🚧 Webhook signature verification failed');
		return json({ error: 'Webhook error' }, { status: 400 });
	}
	if (event.type == 'checkout.session.completed') {
		// get data object
		const checkoutSession = event.data.object as any;
		const session = await stripe.checkout.sessions.retrieve(checkoutSession.id, {
			expand: ['line_items']
		});
		const { amount_total, customer_details, line_items, metadata } = session;
		if (amount_total && line_items && line_items.data.length > 0 && metadata) {
			const { price } = line_items.data[0];
			const visibility = metadata.visibility as string;
			if (price && price.product && customer_details && customer_details.email) {
				const campaign = await prisma.campaign.findUnique({
					where: {
						id: price.product.toString()
					}
				});
				if (!campaign) {
					return json({ error: 'Invalid campaign' }, { status: 400 });
				}
				const donation = amount_total / 100;
				const amountCollected = campaign.amountCollected + donation;
				if (visibility == 'true') {
					await prisma.campaign.update({
						where: {
							id: campaign.id
						},
						data: {
							amountCollected: amountCollected,
							donations: {
								push: donation
							},
							donators: {
								push: customer_details.email
							}
						}
					});
				} else {
					await prisma.campaign.update({
						where: {
							id: campaign.id
						},
						data: {
							amountCollected: amountCollected
						}
					});
				}
			}
		} else {
			return json({ error: 'Invalid line items or customer details' }, { status: 400 });
		}
	}
	return json({ success: true }, { status: 200 });
};
