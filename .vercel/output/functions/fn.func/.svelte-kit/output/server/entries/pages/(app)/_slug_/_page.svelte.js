import { c as create_ssr_component, b as add_attribute, e as escape } from "../../../../chunks/index3.js";
import "../../../../chunks/utils.js";
import { P as Profile } from "../../../../chunks/profile.js";
import { g as getDaysLeft } from "../../../../chunks/date.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<section class="${"pb-10"}"><div class="${"relative rounded-lg group overflow-hidden"}"><img${add_attribute("src", data.campaign.image, 0)}${add_attribute("alt", data.campaign.title, 0)} class="${"w-full h-96 object-cover group-hover:scale-150 transition-all duration-500"}">
		<div class="${"hidden absolute w-full h-full inset-0 bg-black bg-opacity-70 group-hover:block "}"></div>
		<div class="${"hidden absolute top-1/2 -translate-y-1/2 right-5 group-hover:flex flex-col gap-3 text-right text-skin-inverted animate-fade"}"><div><h1 class="${"text-2xl font-semibold"}">${escape(getDaysLeft(`${data.campaign.endDate}`))}</h1>
				<h2 class="${"font-medium text-xl"}">Days Left</h2></div>
			<div><h1 class="${"text-2xl font-semibold"}">${escape(data.campaign.amountCollected)}</h1>
				<h2 class="${"font-medium text-xl"}">Raised of ${escape(data.campaign.target)}</h2></div>
			<div><h1 class="${"text-2xl font-semibold"}">${escape(data.campaign.donators.length)}</h1>
				<h2 class="${"font-medium text-xl"}">Total backers</h2></div></div></div>
	<div class="${"flex flex-col gap-5 py-5"}"><div class="${"flex flex-col gap-3"}"><div class="${"flex justify-between"}"><h1 class="${"animate-gradient-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl font-bold"}">${escape(data.campaign.title)}</h1>
				<div class="${"flex gap-1 items-center"}"><div class="${"flex flex-col"}"><span class="${"text-xs"}">${escape(data.campaign.user.email)}</span>
						<span class="${"text-xs text-skin-muted"}">${escape(`${data.campaign.user.campaigns.length} ${data.campaign.user.campaigns.length <= 1 ? "campaign" : "campaigns"}`)}</span></div>
					<div class="${"w-8 h-8 rounded-full shadow-lg bg-light-muted"}"><img class="${"w-8"}"${add_attribute("src", Profile, 0)} alt="${"profile"}"></div></div></div>

			<div><h1 class="${"text-xl font-medium my-2"}">Story</h1>
				<p class="${"text-skin-muted text-justify"}">${escape(data.campaign.story)}</p></div>
			<div><h1 class="${"text-xl font-medium my-2"}">Donators</h1>
				${data.campaign.donators.length > 0 ? `<p class="${"text-skin-muted"}">${escape(data.campaign.donators.length)}</p>` : `<p class="${"text-skin-muted"}">No donators yet. Be the first one!</p>`}</div></div>
		<div class="${"flex flex-col min-w-[400px] self-center"}"><form class="${"bg-muted shadow-lg flex flex-col gap-3 p-5 rounded-lg"}" action="${"?/donate"}" method="${"POST"}"><input type="${"number"}" name="${"amount"}" step="${"0.1"}" required placeholder="${"Dollars $"}" class="${"bg-transparent border-[1px] border-base focus:outline-none p-3 rounded-lg"}">
				<button class="${"bg-accent text-dominant p-3 rounded-lg"}">Donate</button></form></div></div></section>`;
});
export {
  Page as default
};
