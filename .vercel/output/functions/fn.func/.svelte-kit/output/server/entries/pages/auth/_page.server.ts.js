import { r as redirect, f as fail } from "../../../chunks/index.js";
const handleAuthRedirect = function(event, status = "failure", message = "") {
  const fromUrl = event.url.pathname + event.url.search;
  return `/auth?redirectTo=${fromUrl}&message=${message}&status=${status}`;
};
const load = async ({ locals }) => {
  if (locals.session) {
    throw redirect(302, "/personal");
  }
};
const actions = {
  signup: async function(event) {
    const { request, locals } = event;
    const body = Object.fromEntries(await request.formData());
    if (body.password.length < 6) {
      return fail(500, {
        error: "Password must be at least 6 characters"
      });
    }
    const { error: err } = await locals.supabase.auth.signUp({
      email: body.email,
      password: body.password
    });
    if (err) {
      if (err.status >= 400 && err.status <= 499) {
        return fail(400, {
          error: "Invalid password or email"
        });
      }
      console.log(err);
      return fail(500, {
        error: "Server error. Please try again later"
      });
    }
    throw redirect(302, handleAuthRedirect(event, "success", "Please confirm your mail to login"));
  },
  login: async function({ request, locals }) {
    const body = Object.fromEntries(await request.formData());
    const { error: err } = await locals.supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password
    });
    if (err) {
      if (err.status >= 400 && err.status <= 499) {
        return fail(400, {
          error: "Invalid password or email"
        });
      }
      return fail(500, {
        error: "Server error. Please try again later"
      });
    }
    throw redirect(302, "/personal");
  }
};
export {
  actions,
  load
};
