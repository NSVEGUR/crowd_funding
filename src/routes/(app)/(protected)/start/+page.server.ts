import { fail, error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { stripe } from '$lib/server/stripe';
import crypto from 'crypto';
import type { CampaignType } from '@prisma/client';

export const actions: Actions = {
	create: async function ({ locals, request }) {
		if (!locals.session) {
			return fail(401, { error: 'Unauthorized, login again' });
		}
		const body = Object.fromEntries(await request.formData());
		const { name, title, story, goal, date, type, others } = body;
		if (!name || !title || !story || !goal || !date || !type) {
			return fail(400, { error: 'Insufficient data' });
		}
		if (type === 'Others' && !others) {
			return fail(400, { error: 'Please provide others campaign type' });
		}
		const file = body.file as Blob;
		if (!file) {
			return fail(400, { error: 'Please upload a image for campaign' });
		}
		if (file.size > 2097152) {
			return fail(400, { error: 'File size exceeded must be lower than 1MB' });
		}
		const endDate = new Date(date as string).getTime();
		if (endDate <= Date.now()) {
			return fail(400, { error: 'Please provide a future ending date' });
		}
		const fileExt = file.name.split('.').pop();
		const filePath = `${crypto.randomBytes(32).toString('hex')}.${fileExt}`;
		const { error: err } = await locals.supabase.storage
			.from('campaign_images')
			.upload(filePath, file);
		if (err) {
			throw error(500, 'Error in uploading campaign image');
		}
		const campaignType = body.type as CampaignType;
		const campaignData = {
			userName: body.name as string,
			userId: locals.session.user.id,
			title: body.title as string,
			story: body.story as string,
			target: parseFloat(body.goal as string),
			image: filePath,
			endDate: new Date(endDate),
			type: campaignType,
			othersType: campaignType === 'Others' ? (body.others as string) : undefined
		};
		let campaignId: undefined | string = undefined;
		try {
			const campaign = await prisma.campaign.create({
				data: campaignData
			});
			campaignId = campaign.id;
			await stripe.products.create({
				id: campaign.id,
				name: campaign.title,
				description: campaign.story
			});
		} catch (err) {
			console.log(err);
			throw error(500, 'Error occurred during campaign creation');
		}
		throw redirect(303, campaignId ? `/${campaignId}` : '/');
	}
};
