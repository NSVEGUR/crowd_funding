import { p as prisma } from "../../../../chunks/prisma.js";
import { e as error, f as fail, r as redirect } from "../../../../chunks/index.js";
import { D as DOMAIN_ADDRESS } from "../../../../chunks/private.js";
import { s as stripe } from "../../../../chunks/stripe.js";
const load = async ({ params }) => {
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
const actions = {
  donate: async function({ request }) {
    const data = await request.formData();
    const amount = data.get("amount");
    const campaignId = data.get("campaignId");
    if (!data || !amount) {
      return fail(400, {
        error: "Incomplete details"
      });
    }
    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount_decimal: JSON.stringify(parseFloat(amount) * 100),
      product: campaignId
    });
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: price.id, quantity: 1 }],
      mode: "payment",
      success_url: DOMAIN_ADDRESS + "/payments/success",
      cancel_url: DOMAIN_ADDRESS + "/payments/cancel"
    });
    throw redirect(302, session.url ?? "/payments/cancel");
  }
};
export {
  actions,
  load
};
