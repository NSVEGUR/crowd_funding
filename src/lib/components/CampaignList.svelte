<script lang="ts">
	import type { Campaign, CampaignType } from '@prisma/client';
	import CampaignCard from '$lib/components/CampaignCard.svelte';
	export let type: CampaignType;
	export let campaignType: 'Public' | 'Protected' = 'Public';
	export let campaigns: (Campaign & {
		user: {
			email: string;
		};
	})[];
</script>

<h1 class="font-medium text-2xl mb-5">{type} Campaigns ({campaigns.length})</h1>
<div class="grid pb-10 grid-cols-3 gap-14 items-start -lg:grid-cols-2 -md:grid-cols-1 -md:gap-10">
	{#each campaigns as campaign}
		<CampaignCard {campaign} type={campaignType} />
	{/each}
</div>
