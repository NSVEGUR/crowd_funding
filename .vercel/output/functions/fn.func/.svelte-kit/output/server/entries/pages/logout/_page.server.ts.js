import { e as error, r as redirect } from "../../../chunks/index.js";
const load = async ({ locals }) => {
  const { error: err } = await locals.supabase.auth.signOut();
  if (err) {
    throw error(500, "Something went wrong in logging out");
  }
  throw redirect(303, "/auth");
};
const actions = {
  default: async ({ locals }) => {
    const { error: err } = await locals.supabase.auth.signOut();
    if (err) {
      throw error(500, "Something went wrong in logging out");
    }
    throw redirect(303, "/auth");
  }
};
export {
  actions,
  load
};
