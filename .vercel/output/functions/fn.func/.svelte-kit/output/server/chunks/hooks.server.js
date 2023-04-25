import "./supabase.js";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { D as DOMAIN_ADDRESS, A as API_KEY } from "./private.js";
const handle = async function({ event, resolve }) {
  const { session, supabaseClient } = await getSupabase(event);
  event.locals.supabase = supabaseClient;
  event.locals.session = session;
  return resolve(event);
};
const handleError = async ({ error }) => {
  console.error(error);
};
const handleFetch = async ({ request, fetch }) => {
  if (request.url.startsWith(DOMAIN_ADDRESS + "/api")) {
    request = new Request(
      request.url.replace(request.url, request.url + `/?API_KEY=${API_KEY}`),
      request
    );
  }
  return fetch(request);
};
export {
  handle,
  handleError,
  handleFetch
};
