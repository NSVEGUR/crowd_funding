import { redirect, fail, error } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { stripe } from '$lib/server/stripe';

export const actions: Actions = {
	create: async function ({ locals, request }) {
		if (!locals.session) {
			return fail(401, { error: 'Unauthorized, login again' });
		}
		const body = Object.fromEntries(await request.formData());
		const { name, title, story, goal, date, image } = body;
		if (!name || !title || !story || !goal || !date || !image) {
			return fail(400, { error: 'Insufficient data' });
		}
		const endDate = new Date(date as string).getTime();
		if (endDate <= Date.now()) {
			return fail(400, { error: 'Please provide a future ending date' });
		}
		const data = {
			userId: locals.session.user.id,
			title: body.title as string,
			story: body.story as string,
			target: parseFloat(body.goal as string),
			image: body.image as string,
			endDate: new Date(endDate)
		};
		try {
			const campaign = await prisma.campaign.create({
				data
			});
			await stripe.products.create({
				id: campaign.id,
				name: campaign.title,
				description: campaign.story
			});
		} catch (err) {
			throw error(500, 'Error occurred during campaign creation');
		}
		throw redirect(302, '/');
	}
};
