<script lang="ts">
	import type { PageData } from './$types';
	import CampaignCard from '$lib/components/CampaignCard.svelte';
	export let data: PageData;
</script>

<section>
	{#if data.campaigns && data.campaigns.length > 0}
		<h1 class="font-medium text-2xl mb-5">All Campaigns ({data.campaigns.length})</h1>
		<div class="grid pb-10 grid-cols-4 gap-14 items-start -lg:grid-cols-1 -md:gap-10">
			{#each data.campaigns as campaign}
				<CampaignCard {campaign} />
			{/each}
		</div>
	{:else}
		<div class="text-skin-muted">No Campaigns</div>
	{/if}
</section>
