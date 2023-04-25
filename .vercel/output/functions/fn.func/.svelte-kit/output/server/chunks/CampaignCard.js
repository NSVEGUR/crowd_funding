import { c as create_ssr_component, e as escape, b as add_attribute } from "./index3.js";
import { g as getDaysLeft } from "./date.js";
import { P as Profile } from "./profile.js";
const CampaignCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { campaign } = $$props;
  let { type = "public" } = $$props;
  if ($$props.campaign === void 0 && $$bindings.campaign && campaign !== void 0)
    $$bindings.campaign(campaign);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  return `<a class="${"group h-96 shadow-lg transition-all duration-500 rounded-xl flex flex-col cursor-pointer justify-evenly"}" href="${escape(type == "personal" ? "/personal" : "", true) + "/" + escape(campaign.id, true)}"><div class="${"h-[65%] relative group-hover:h-[45%] transition-all duration-500 overflow-hidden rounded-t-xl"}"><img class="${"object-cover w-full h-full group-hover:scale-110 transition-all duration-300"}"${add_attribute("src", campaign.image, 0)}${add_attribute("alt", campaign.title, 0)}>
		<div class="${"absolute h-full w-full inset-0 bg-black bg-opacity-50 transition-all duration-300 hidden group-hover:block group-hover:animate-fade"}"></div></div>
	<div class="${"bg-dominant h-[35%] w-full rounded-b-xl flex flex-col justify-center p-5 gap-2 group-hover:h-[60%] transition-all duration-500"}"><h1 class="${"font-semibold text-xl"}">${escape(campaign.title)}</h1>
		<div class="${"flex justify-between"}"><div class="${"flex flex-col"}"><p class="${"text-skin-muted"}">${escape(campaign.amountCollected)}</p>
				<span class="${"text-xs text-skin-muted"}">Raised of ${escape(campaign.target)}</span></div>
			<div class="${"flex flex-col"}"><p class="${"text-skin-muted"}">${escape(getDaysLeft(`${campaign.endDate}`))}</p>
				<span class="${"text-xs text-skin-muted"}">Days Left</span></div></div>
		<div class="${"flex gap-1 items-center"}"><div class="${"w-8 h-8 rounded-full shadow-lg bg-light-muted"}"><img class="${"w-8"}"${add_attribute("src", Profile, 0)} alt="${"profile"}"></div>
			<span class="${"text-xs"}">By ${escape(campaign.user.email)}</span></div>
		<p class="${"hidden group-hover:line-clamp-3 transition-all duration-300 group-hover:animate-fade"}">${escape(campaign.story)}</p></div></a>`;
});
export {
  CampaignCard as C
};
