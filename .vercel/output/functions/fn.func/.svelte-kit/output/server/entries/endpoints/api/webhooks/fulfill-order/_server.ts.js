import { j as json } from "../../../../../chunks/index.js";
import { S as STRIPE_WEBHOOK_SECRET } from "../../../../../chunks/private.js";
import { s as stripe } from "../../../../../chunks/stripe.js";
import { p as prisma } from "../../../../../chunks/prisma.js";
const POST = async ({ request }) => {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");
  let event;
  if (!payload || !signature) {
    return json({ error: "Invalid body" }, { status: 400 });
  }
  try {
    event = stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.warn("🚧 Webhook signature verification failed");
    return json({ error: "Webhook error" }, { status: 400 });
  }
  if (event.type == "checkout.session.completed") {
    const checkoutSession = event.data.object;
    const session = await stripe.checkout.sessions.retrieve(checkoutSession.id, {
      expand: ["line_items"]
    });
    const { amount_total, customer_details, line_items } = session;
    if (amount_total && line_items && line_items.data.length > 0) {
      const { price } = line_items.data[0];
      if (price && price.product && customer_details && customer_details.email) {
        const campaign = await prisma.campaign.findUnique({
          where: {
            id: price.product.toString()
          }
        });
        if (!campaign) {
          return json({ error: "Invalid campaign" }, { status: 400 });
        }
        const donation = amount_total / 100;
        const amountCollected = campaign.amountCollected + donation;
        await prisma.campaign.update({
          where: {
            id: campaign.id
          },
          data: {
            amountCollected,
            donations: {
              push: donation
            },
            donators: {
              push: customer_details.email
            }
          }
        });
      }
    } else {
      return json({ error: "Invalid line items or customer details" }, { status: 400 });
    }
  }
  return json({ success: true }, { status: 200 });
};
export {
  POST
};
