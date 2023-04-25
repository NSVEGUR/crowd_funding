const load = async function({ url, locals }) {
  return {
    url: url.pathname,
    session: locals.session
  };
};
export {
  load
};
