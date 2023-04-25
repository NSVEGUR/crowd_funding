import { c as create_ssr_component, a as subscribe, f as set_store_value } from "../../../../../chunks/index3.js";
import "../../../../../chunks/utils.js";
import { w as writable } from "../../../../../chunks/index2.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".svelte-1lnz8dv::-webkit-calendar-picker-indicator{filter:invert(1)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $error, $$unsubscribe_error;
  let { form } = $$props;
  const error = writable("");
  $$unsubscribe_error = subscribe(error, (value) => $error = value);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  $$result.css.add(css);
  {
    if (form?.error) {
      set_store_value(error, $error = form.error, $error);
    } else {
      set_store_value(error, $error = "", $error);
    }
  }
  $$unsubscribe_error();
  return `<section class="${"w-full h-full pb-10 relative z-10 svelte-1lnz8dv"}"><div class="${"flex w-full items-center justify-center svelte-1lnz8dv"}"><h1 class="${"text-center text-skin-base font-medium text-2xl svelte-1lnz8dv"}">Start a Campaign</h1></div>
	<form action="${"?/create"}" method="${"POST"}" class="${"flex flex-col h-full gap-5 svelte-1lnz8dv"}"><div class="${"flex gap-10 w-full justify-evenly mt-5 -md:flex-col svelte-1lnz8dv"}"><div class="${"flex flex-col gap-2 w-full svelte-1lnz8dv"}"><label for="${"name"}" class="${"text-skin-muted svelte-1lnz8dv"}">Your Name *</label>
				<input type="${"text"}" name="${"name"}" required minlength="${"3"}" class="${"bg-transparent border-[1px] focus:outline-none border-base h-12 rounded-lg w-full p-5 svelte-1lnz8dv"}" placeholder="${"Jhon"}"></div>
			<div class="${"flex flex-col gap-2 w-full svelte-1lnz8dv"}"><label for="${"title"}" class="${"text-skin-muted svelte-1lnz8dv"}">Campaign Title *</label>
				<input type="${"text"}" name="${"title"}" minlength="${"5"}" class="${"bg-transparent border-[1px] focus:outline-none border-base h-12 rounded-lg w-full p-5 svelte-1lnz8dv"}" placeholder="${"Title"}"></div></div>
		<div class="${"flex flex-col gap-2 w-full items-center svelte-1lnz8dv"}"><label for="${"story"}" class="${"self-start text-skin-muted svelte-1lnz8dv"}">Story*</label>
			<textarea name="${"story"}" id="${"story"}" minlength="${"10"}" rows="${"10"}" required class="${"bg-transparent border-[1px] focus:outline-none border-base rounded-lg w-full p-5 svelte-1lnz8dv"}" placeholder="${"Write your story..."}"></textarea></div>
		<div class="${"flex gap-10 w-full justify-evenly mt-5 -md:flex-col svelte-1lnz8dv"}"><div class="${"flex flex-col gap-2 w-full svelte-1lnz8dv"}"><label for="${"goal"}" class="${"text-skin-muted svelte-1lnz8dv"}">Goal *</label>
				<input type="${"number"}" name="${"goal"}" step="${"0.1"}" required class="${"bg-transparent border-[1px] focus:outline-none border-base h-12 rounded-lg w-full p-5 svelte-1lnz8dv"}" placeholder="${"Dollars $"}"></div>
			<div class="${"flex flex-col gap-2 w-full svelte-1lnz8dv"}"><label for="${"date"}" class="${"text-skin-muted svelte-1lnz8dv"}">End Date *</label>
				<input type="${"date"}" name="${"date"}" required class="${"bg-transparent border-[1px] focus:outline-none border-base h-12 rounded-lg w-full p-5 text-skin-base svelte-1lnz8dv"}"></div></div>
		<div class="${"flex flex-col gap-2 w-full items-center svelte-1lnz8dv"}"><label for="${"image"}" class="${"self-start text-skin-muted svelte-1lnz8dv"}">Campaign image*</label>
			<input type="${"url"}" name="${"image"}" required class="${"w-full bg-transparent focus:outline-none border-[1px] border-base rounded-lg p-5 h-12 svelte-1lnz8dv"}" placeholder="${"Image URL of your campaign"}"></div>
		<div class="${"flex w-full items-center justify-center svelte-1lnz8dv"}"><button type="${"submit"}" class="${"text-center bg-accent text-skin-inverted font-medium text-lg p-2 px-3 rounded-lg svelte-1lnz8dv"}">Submit new campaign</button></div></form>
</section>`;
});
export {
  Page as default
};
