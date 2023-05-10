import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	try {
		const campaigns = await prisma.campaign.findMany({
			include: {
				user: {
					select: {
						email: true
					}
				}
			}
		});
		return {
			campaigns: campaigns
		};
	} catch (err) {
		throw error(500, "Can't reach database server");
	}
};
