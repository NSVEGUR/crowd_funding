import { p as prisma } from "../../../chunks/prisma.js";
const load = async () => {
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
    campaigns
  };
};
export {
  load
};
