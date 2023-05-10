import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';
import type { CampaignType, Campaign } from '@prisma/client';
import crypto from 'crypto';

export const load: PageServerLoad = async ({ params }) => {
	let campaign:
		| (Campaign & {
				donations: {
					anonymous: boolean;
					amount: number;
					user: {
						name: string | null;
						email: string;
					};
				}[];
				withdrawalRequests: {
					amount: number;
					createdAt: Date;
					approved: boolean;
				}[];
				user: {
					email: string;
					campaigns: {
						title: string;
					}[];
				};
		  })
		| null;
	try {
		campaign = await prisma.campaign.findUnique({
			where: {
				id: params.slug
			},
			include: {
				withdrawalRequests: {
					select: {
						amount: true,
						createdAt: true,
						approved: true
					}
				},
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
	} catch (err) {
		console.error(err);
		throw error(500, "Can't reach database server");
	}
	if (!campaign) {
		throw error(404, 'Campaign not found');
	}
	return {
		campaign
	};
};

export const actions: Actions = {
	update: async function ({ request, locals }) {
		if (!locals.session) {
			return fail(401, { error: 'Unauthorized, login again' });
		}
		const body = Object.fromEntries(await request.formData());
		const { name, title, story, goal, date, type, others, imgChanged, campaignId } = body;
		if (!name || !title || !story || !goal || !date || !type || !imgChanged || !campaignId) {
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
		let campaign: Campaign | null;
		try {
			campaign = await prisma.campaign.findUnique({
				where: {
					id: campaignId as string
				}
			});
		} catch (err) {
			console.log(err);
			throw error(500, 'Error occurred during retrieving campaign');
		}
		if (!campaign) {
			throw error(404, 'Campaign not found');
		}
		const campaignType = body.type as CampaignType;
		const campaignData = {
			userName: body.name as string,
			userId: locals.session.user.id,
			title: body.title as string,
			story: body.story as string,
			target: parseFloat(body.goal as string),
			endDate: new Date(endDate),
			type: campaignType,
			image: body.path as string,
			othersType: campaignType === 'Others' ? (body.others as string) : undefined
		};
		if (imgChanged == 'true') {
			const { error: err_remove } = await locals.supabase.storage
				.from('campaign_images')
				.remove(campaign.image);
			if (err_remove) {
				throw error(500, 'Error in removing old image');
			}
			const fileExt = file.name.split('.').pop();
			const filePath = `${crypto.randomBytes(32).toString('hex')}.${fileExt}`;
			const { error: err_upload } = await locals.supabase.storage
				.from('campaign_images')
				.upload(filePath, file);
			if (err_upload) {
				throw error(500, 'Error in uploading campaign image');
			}
			campaignData.image = filePath;
		}
		try {
			await prisma.campaign.update({
				where: {
					id: campaign.id
				},
				data: campaignData
			});
		} catch (err) {
			console.log(err);
			throw error(500, 'Error occurred during campaign creation');
		}
		throw redirect(303, '/personal');
	}
};
