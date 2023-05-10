<script lang="ts">
	import type { PageData } from './$types';
	import CampaignList from '$lib/components/CampaignList.svelte';
	export let data: PageData;
	import { createSearchStore, search, searchHandler } from '$lib/stores';
	import { onDestroy } from 'svelte';

	$: searchCampaigns = data.campaigns.map((campaign) => {
		return {
			...campaign,
			searchTerms: `${campaign.type} ${campaign.title} ${campaign.story} ${campaign.othersType} ${campaign.user.email}`
		};
	});
	$: campaigns = createSearchStore(searchCampaigns);
	$: $campaigns.search = $search;
	$: unsubscribe = campaigns.subscribe((model) => searchHandler(model));

	$: education = $campaigns.filtered.filter((campaign) => campaign.type == 'Education');
	$: ngo = $campaigns.filtered.filter((campaign) => campaign.type == 'NGO');
	$: personal = $campaigns.filtered.filter((campaign) => campaign.type == 'Personal');
	$: others = $campaigns.filtered.filter((campaign) => campaign.type == 'Others');
	onDestroy(() => {
		unsubscribe();
	});
</script>

<section class="mb-20">
	{#if data.campaigns && data.campaigns.length > 0}
		{#if education.length > 0}
			<CampaignList campaigns={education} type="Education" campaignType="Protected" />
		{/if}
		{#if ngo.length > 0}
			<CampaignList campaigns={ngo} type="NGO" campaignType="Protected" />
		{/if}
		{#if personal.length > 0}
			<CampaignList campaigns={personal} type="Personal" campaignType="Protected" />
		{/if}
		{#if others.length > 0}
			<CampaignList campaigns={others} type="Others" campaignType="Protected" />
		{/if}
	{:else}
		<div class="text-skin-muted">No Campaigns</div>
	{/if}
</section>
