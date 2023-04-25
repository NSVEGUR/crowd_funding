import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.session) {
		throw error(401, { message: 'Unauthorized, login again' });
	}
	const campaign = await prisma.campaign.findUnique({
		where: {
			id: params.slug
		},
		include: {
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
