import { c as create_ssr_component, e as escape, d as each, v as validate_component } from "../../../../../chunks/index3.js";
import { C as CampaignCard } from "../../../../../chunks/CampaignCard.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<section>${data.campaigns && data.campaigns.length > 0 ? `<h1 class="${"font-medium text-2xl mb-5"}">My Campaigns (${escape(data.campaigns.length)})</h1>
		<div class="${"grid pb-10 grid-cols-4 gap-14 items-start -lg:grid-cols-1 -md:gap-10"}">${each(data.campaigns, (campaign) => {
    return `${validate_component(CampaignCard, "CampaignCard").$$render($$result, { campaign, type: "personal" }, {}, {})}`;
  })}</div>` : `<div class="${"text-skin-muted"}">No Campaigns</div>`}</section>`;
});
export {
  Page as default
};
