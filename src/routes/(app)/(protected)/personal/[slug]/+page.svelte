<script lang="ts">
	import Profile from '$lib/images/profile.png';
	import { getDaysLeft } from '$lib/utils/date';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<section class="pb-10">
	<div class="relative rounded-lg group overflow-hidden">
		<img
			src={data.campaign.image}
			alt={data.campaign.title}
			class="w-full h-96 object-cover group-hover:scale-150 transition-all duration-500"
		/>
		<div class="hidden absolute w-full h-full inset-0 bg-black bg-opacity-70 group-hover:block " />
		<div
			class="hidden absolute top-1/2 -translate-y-1/2 right-5 group-hover:flex flex-col gap-3 text-right text-skin-inverted  animate-fade"
		>
			<div>
				<h1 class="text-2xl font-semibold">{getDaysLeft(`${data.campaign.endDate}`)}</h1>
				<h2 class="font-medium text-xl">Days Left</h2>
			</div>
			<div>
				<h1 class="text-2xl font-semibold">{data.campaign.amountCollected}</h1>
				<h2 class="font-medium text-xl">Raised of {data.campaign.target}</h2>
			</div>
			<div>
				<h1 class="text-2xl font-semibold">{data.campaign.donators.length}</h1>
				<h2 class="font-medium text-xl">Total backers</h2>
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-5 py-5">
		<div class="flex flex-col gap-3">
			<div class="flex justify-between">
				<h1
					class=" animate-gradient-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl font-bold"
				>
					{data.campaign.title}
				</h1>
				<div class="flex gap-1 items-center">
					<div class="flex flex-col">
						<span class="text-xs">{data.campaign.user.email}</span>
						<span class="text-xs text-skin-muted"
							>{`${data.campaign.user.campaigns.length} ${
								data.campaign.user.campaigns.length <= 1 ? 'campaign' : 'campaigns'
							}`}</span
						>
					</div>
					<div class="w-8 h-8 rounded-full shadow-lg bg-light-muted">
						<img class="w-8" src={Profile} alt="profile" />
					</div>
				</div>
			</div>

			<div>
				<h1 class="text-xl font-medium my-2">Story</h1>
				<p class="text-skin-muted text-justify">{data.campaign.story}</p>
			</div>
			<div>
				<h1 class="text-xl font-medium my-2">Donators</h1>
				{#if data.campaign.donators.length > 0}
					<p class="text-skin-muted">{data.campaign.donators.length}</p>
				{:else}
					<p class="text-skin-muted">No donators yet. Be the first one!</p>
				{/if}
			</div>
		</div>
	</div>
</section>
