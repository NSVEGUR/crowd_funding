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
		try {
			// get data object
			const checkoutSession = event.data.object as any;
			const session = await stripe.checkout.sessions.retrieve(checkoutSession.id, {
				expand: ['line_items']
			});
			const { amount_total, customer_details, line_items, metadata } = session;
			if (amount_total && line_items && line_items.data.length > 0 && metadata) {
				const { price } = line_items.data[0];
				const anonymous = metadata.anonymous as string;
				if (price && price.product && customer_details && customer_details.email) {
					const campaign = await prisma.campaign.findUnique({
						where: {
							id: price.product.toString()
						}
					});
					if (!campaign) {
						return json({ error: 'Invalid campaign' }, { status: 400 });
					}
					const donationAmount = amount_total / 100;
					const amountCollected = campaign.amountCollected + donationAmount;
					let stripeUser = await prisma.stripeUser.findUnique({
						where: {
							email: customer_details.email
						}
					});
					if (!stripeUser) {
						const stripeCustomer = await stripe.customers.create({
							email: customer_details.email
						});
						stripeUser = await prisma.stripeUser.create({
							data: {
								id: stripeCustomer.id,
								email: customer_details.email,
								name: customer_details.name,
								phone: customer_details.phone
							}
						});
					} else {
						stripeUser = await prisma.stripeUser.update({
							where: {
								id: stripeUser.id
							},
							data: {
								name: customer_details.name,
								phone: customer_details.phone
							}
						});
					}
					await prisma.donation.create({
						data: {
							userId: stripeUser.id,
							campaignId: campaign.id,
							amount: donationAmount,
							anonymous: anonymous == 'true' ? true : false
						}
					});
					await prisma.campaign.update({
						where: {
							id: campaign.id
						},
						data: {
							amountCollected: amountCollected
						}
					});
				}
			} else {
				return json({ error: 'Invalid line items or customer details' }, { status: 400 });
			}
		} catch (err) {
			return json({ error: 'Webhook error' }, { status: 400 });
		}
	}
	return json({ success: true }, { status: 200 });
};
