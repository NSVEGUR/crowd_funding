import { p as prisma } from "../../../../../chunks/prisma.js";
import { e as error } from "../../../../../chunks/index.js";
const load = async ({ locals }) => {
  if (!locals.session) {
    throw error(401, { message: "Unauthorized, login again" });
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
    campaigns
  };
};
export {
  load
};
