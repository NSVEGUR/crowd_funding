import { prisma } from '$lib/server/prisma';
import { fail, error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { Campaign } from '@prisma/client';

export const actions: Actions = {
	withdraw: async function ({ request, locals, params }) {
		if (!locals.session) {
			return fail(401, { error: 'Unauthorized, login again' });
		}
		const body = Object.fromEntries(await request.formData());
		const { amount, transit, institution, account } = body;
		if (!amount || !transit || !institution || !account) {
			return fail(400, { error: 'Insufficient data' });
		}
		const withdrawal_amount = parseFloat(body.amount as string);
		if (withdrawal_amount < 0.5) {
			return fail(400, { error: 'Withdrawal amount must be greater than 0.5' });
		}
		if ((transit as string).length !== 5) {
			return fail(400, { error: 'Transit must have 5 digits' });
		}
		if ((institution as string).length !== 3) {
			return fail(400, { error: 'Institution must have 3 digits' });
		}
		if ((account as string).length !== 7) {
			return fail(400, { error: 'Account must have 7 digits' });
		}
		let campaign: Campaign | null;
		try {
			campaign = await prisma.campaign.findUnique({
				where: {
					id: params.slug
				}
			});
		} catch (err) {
			console.log(err);
			throw error(500, 'Error occurred during retrieving campaign');
		}
		if (!campaign) {
			throw error(404, 'Campaign not found');
		}
		if (withdrawal_amount > campaign.amountCollected) {
			return fail(400, { error: 'Withdrawal amount exceeded amount collected' });
		}
		try {
			await prisma.withdrawalRequest.create({
				data: {
					campaignId: campaign.id,
					amount: withdrawal_amount,
					transitNumber: parseInt(transit as string),
					institutionNumber: parseInt(institution as string),
					accountNumber: parseInt(account as string)
				}
			});
		} catch (err) {
			console.log(err);
			throw error(500, 'Error in creating withdrawal request');
		}
		throw redirect(303, `/protected/${params.slug}`);
	}
};
