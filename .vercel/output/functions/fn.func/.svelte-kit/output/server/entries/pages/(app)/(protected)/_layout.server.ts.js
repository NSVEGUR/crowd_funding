import { getServerSession } from "@supabase/auth-helpers-sveltekit";
import { r as redirect } from "../../../../chunks/index.js";
const load = async function(event) {
  if (!event.locals.session) {
    throw redirect(302, "/auth");
  }
  return {
    session: await getServerSession(event)
  };
};
export {
  load
};
