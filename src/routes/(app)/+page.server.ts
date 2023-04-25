import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
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
};
