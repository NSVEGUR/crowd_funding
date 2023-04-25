import { f as fail, e as error, r as redirect } from "../../../../../chunks/index.js";
import { p as prisma } from "../../../../../chunks/prisma.js";
import { s as stripe } from "../../../../../chunks/stripe.js";
const actions = {
  create: async function({ locals, request }) {
    if (!locals.session) {
      return fail(401, { error: "Unauthorized, login again" });
    }
    const body = Object.fromEntries(await request.formData());
    const { name, title, story, goal, date, image } = body;
    if (!name || !title || !story || !goal || !date || !image) {
      return fail(400, { error: "Insufficient data" });
    }
    const endDate = new Date(date).getTime();
    if (endDate <= Date.now()) {
      return fail(400, { error: "Please provide a future ending date" });
    }
    const data = {
      userId: locals.session.user.id,
      title: body.title,
      story: body.story,
      target: parseFloat(body.goal),
      image: body.image,
      endDate: new Date(endDate)
    };
    try {
      const campaign = await prisma.campaign.create({
        data
      });
      await stripe.products.create({
        id: campaign.id,
        name: campaign.title,
        description: campaign.story
      });
    } catch (err) {
      throw error(500, "Error occurred during campaign creation");
    }
    throw redirect(302, "/");
  }
};
export {
  actions
};
