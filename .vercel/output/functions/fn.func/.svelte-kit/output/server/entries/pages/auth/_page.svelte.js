import { c as create_ssr_component, b as add_attribute, e as escape } from "../../../chunks/index3.js";
import { L as Logo } from "../../../chunks/logo.js";
import "../../../chunks/utils.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let error;
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  error = form?.error;
  {
    {
      error = void 0;
    }
  }
  {
    if (error) {
      setTimeout(
        () => {
          error = "";
        },
        1e4
      );
    }
  }
  return `${`<form action="${"?/login"}" method="${"POST"}" class="${"w-full h-full flex flex-col gap-3 items-center justify-center"}"><div class="${"flex gap-1 items-end mb-5"}"><img${add_attribute("src", Logo, 0)} alt="${"logo"}" class="${"w-10"}">
			<span class="${"font-medium text-xl"}">Crowd Funding</span></div>
		<div class="${"flex flex-col min-w-[30%] gap-2"}"><label for="${"email"}">Email *</label>
			<input type="${"email"}" name="${"email"}" required class="${"bg-transparent focus:outline-none border-[1px] border-base p-3 rounded-lg w-full"}" placeholder="${"Your email"}"></div>
		<div class="${"flex flex-col min-w-[30%] gap-1"}"><label for="${"password"}">Password *</label>
			<input type="${"password"}" required minlength="${"6"}" name="${"password"}" class="${"bg-transparent focus:outline-none border-[1px] border-base p-3 rounded-lg w-full"}" placeholder="${"Password"}"></div>
		${error ? `<div><h1 class="${"text-center text-skin-error"}">${escape(error)}</h1></div>` : ``}
		<button type="${"submit"}" class="${"bg-inverted text-skin-inverted p-2 min-w-[30%] rounded-lg mt-2"}">Login</button>
		<div class="${"flex justify-evenly gap-5 min-w-[30%]"}"><button class="${"p-2 border-[1px] border-base w-full rounded-lg"}"><i class="${"fab fa-google"}"></i></button>
			<button class="${"p-2 border-[1px] border-base w-full rounded-lg"}"><i class="${"fab fa-github"}"></i></button>
			<button class="${"p-2 border-[1px] border-base w-full rounded-lg"}"><i class="${"fab fa-discord"}"></i></button></div>
		<div class="${"text-skin-muted"}"><h1>No Account? <button class="${"text-skin-base hover:underline"}">Signup Here</button></h1></div></form>`}`;
});
export {
  Page as default
};
