import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';
import { DOMAIN_ADDRESS } from '$env/static/private';
import { stripe } from '$lib/server/stripe';

export const load: PageServerLoad = async ({ params }) => {
	const campaign = await prisma.campaign.findUnique({
		where: {
			id: params.slug
		},
		include: {
			donations: {
				select: {
					anonymous: true,
					amount: true,
					user: {
						select: {
							name: true,
							email: true
						}
					}
				},
				orderBy: {
					amount: 'desc'
				}
			},
			user: {
				select: {
					email: true,
					campaigns: {
						select: {
							title: true
						}
					}
				}
			}
		}
	});
	if (!campaign) {
		throw error(404, 'Campaign not found');
	}
	return {
		campaign
	};
};

export const actions: Actions = {
	donate: async function ({ request }) {
		const data = await request.formData();
		const amount = data.get('amount') as string;
		const campaignId = data.get('campaignId') as string;
		const anonymous = data.get('anonymous') as string;
		if (!amount || !campaignId || !anonymous) {
			return fail(400, {
				error: 'Incomplete details'
			});
		}
		const unit_amount_decimal = (parseFloat(amount) * 100).toFixed(4);
		const price = await stripe.prices.create({
			currency: 'usd',
			unit_amount_decimal,
			product: campaignId
		});
		const session = await stripe.checkout.sessions.create({
			line_items: [{ price: price.id, quantity: 1 }],
			mode: 'payment',
			phone_number_collection: {
				enabled: true
			},
			success_url: DOMAIN_ADDRESS + '/payments/success',
			cancel_url: DOMAIN_ADDRESS + '/payments/cancel',
			metadata: {
				anonymous: anonymous
			}
		});
		throw redirect(302, session.url ?? '/payments/cancel');
	}
};
