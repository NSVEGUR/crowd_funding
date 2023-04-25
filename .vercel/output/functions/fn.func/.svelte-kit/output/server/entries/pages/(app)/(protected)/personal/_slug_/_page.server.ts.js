import { p as prisma } from "../../../../../../chunks/prisma.js";
import { e as error } from "../../../../../../chunks/index.js";
const load = async ({ params, locals }) => {
  if (!locals.session) {
    throw error(401, { message: "Unauthorized, login again" });
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
    throw error(404, "Campaign not found");
  }
  return {
    campaign
  };
};
export {
  load
};
