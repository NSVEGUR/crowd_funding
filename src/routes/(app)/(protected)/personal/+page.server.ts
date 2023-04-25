import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session) {
		throw error(401, { message: 'Unauthorized, login again' });
	}
	const campaigns = await prisma.campaign.findMany({
		where: {
			userId: locals.session.user.id
		},
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
