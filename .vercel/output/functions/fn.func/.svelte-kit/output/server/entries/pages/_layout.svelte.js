import { c as create_ssr_component, a as subscribe, o as onDestroy, e as escape, b as add_attribute, v as validate_component } from "../../chunks/index3.js";
import { w as writable } from "../../chunks/index2.js";
const app = "";
var Status = /* @__PURE__ */ ((Status2) => {
  Status2["ERROR"] = "ERROR";
  Status2["SUCCESS"] = "SUCCESS";
  Status2["PROMISE"] = "PROMISE";
  Status2["IDLE"] = "IDLE";
  return Status2;
})(Status || {});
const createSnackBar = () => {
  const snackbar2 = {
    status: "IDLE",
    message: "",
    icon: "🤡",
    style: ""
  };
  const { subscribe: subscribe2, set, update } = writable(snackbar2);
  const error = function(message, style = "") {
    update(() => {
      return {
        status: "ERROR",
        message,
        icon: "❌",
        style
      };
    });
  };
  const success = function(message, style = "") {
    update(() => {
      return {
        status: "SUCCESS",
        message,
        icon: "✅",
        style
      };
    });
  };
  const promise = function(message, style = "") {
    update(() => {
      return {
        status: "PROMISE",
        message,
        icon: "⏳",
        style
      };
    });
  };
  const reset = function() {
    update(() => {
      return {
        status: "IDLE",
        message: "",
        icon: "🤡",
        style: ""
      };
    });
  };
  return {
    subscribe: subscribe2,
    set,
    update,
    error,
    success,
    promise,
    reset
  };
};
const snackbarHandler = (store) => {
  if (store.status === "ERROR" || store.status === "SUCCESS") {
    setTimeout(() => {
      snackbar.reset();
    }, 4e3);
  }
};
const snackbar = createSnackBar();
const Snackbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $snackbar, $$unsubscribe_snackbar;
  $$unsubscribe_snackbar = subscribe(snackbar, (value) => $snackbar = value);
  const unsubscribe = snackbar.subscribe((model) => snackbarHandler(model));
  onDestroy(() => {
    unsubscribe();
  });
  $$unsubscribe_snackbar();
  return `${$snackbar.status == Status.ERROR ? `<div class="${"fixed top-10 right-10 p-2 px-4 bg-inverted shadow-xl rounded-md border-[1px] border-base flex gap-1 items-center z-[100]"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke-width="${"1.5"}" stroke="${"currentColor"}" class="${"w-6 h-6 text-skin-error"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" d="${"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"}"></path></svg>
		<p class="${"font-medium text-skin-inverted"}">${escape($snackbar.message)}</p></div>` : `${$snackbar.status == Status.SUCCESS ? `<div class="${"fixed top-10 right-10 p-2 px-4 bg-inverted shadow-xl rounded-md border-[1px] border-base flex gap-1 items-center z-[100]"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke-width="${"1.5"}" stroke="${"currentColor"}" class="${"w-6 h-6 text-skin-okay"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" d="${"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"}"></path></svg>

		<p class="${"font-medium text-skin-inverted"}">${escape($snackbar.message)}</p></div>` : `${$snackbar.status == Status.PROMISE ? `<div class="${"fixed top-10 right-10 p-2 px-4 bg-inverted shadow-xl rounded-md border-[1px] border-base flex gap-1 items-center z-[100]"}"><svg aria-hidden="${"true"}" role="${"status"}" class="${"inline w-4 h-4 mr-3 text-gray-200 animate-spin"}" viewBox="${"0 0 100 101"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"}" fill="${"currentColor"}"></path><path d="${"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"}" fill="${"#000000"}"></path></svg>
		<p class="${"font-medium text-skin-inverted"}">${escape($snackbar.message)}</p></div>` : ``}`}`}`;
});
const GradientBackground = "/_app/immutable/assets/gradient-background.80d89172.png";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main class="${"bg-dominant text-skin-base h-screen w-screen overflow-hidden relative"}"><div class="${"absolute top-0 z-0"}"><img${add_attribute("src", GradientBackground, 0)} alt="${"gradient-background"}"></div>
	${validate_component(Snackbar, "Snackbar").$$render($$result, {}, {}, {})}
	${slots.default ? slots.default({}) : ``}</main>`;
});
export {
  Layout as default
};
