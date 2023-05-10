<script lang="ts">
	import { getDaysLeft } from '$lib/utils/date';
	import Profile from '$lib/images/profile.png';
	import type { Campaign } from '@prisma/client';
	import { supabaseClient } from '$lib/supabase';
	export let campaign: Campaign & {
		user: {
			email: string;
		};
	};
	export let type: 'Public' | 'Protected';
	let imageUrl: string | null = null;
	const downloadImage = async (path: string) => {
		try {
			const { data, error } = await supabaseClient.storage.from('campaign_images').download(path);

			if (error) {
				throw error;
			}
			const url = URL.createObjectURL(data);
			imageUrl = url;
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message);
			}
		}
	};
	$: if (campaign.image) {
		downloadImage(campaign.image);
	}
</script>

<a
	class="group h-96 shadow-lg transition-all duration-500 rounded-xl flex flex-col cursor-pointer justify-evenly"
	href="{type === 'Protected' ? `${type.toLowerCase()}` : ''}/{campaign.id}"
>
	<div
		class="h-[65%] relative group-hover:h-[45%] transition-all duration-500 overflow-hidden rounded-t-xl"
	>
		{#if imageUrl}
			<img
				class="object-cover w-full h-full group-hover:scale-110 transition-all duration-300"
				src={imageUrl}
				alt={campaign.title}
			/>
		{:else}
			<div class="w-full h-full bg-light-muted" />
		{/if}
		<div
			class="absolute h-full w-full inset-0 bg-black bg-opacity-50 transition-all duration-300 hidden group-hover:block group-hover:animate-fade"
		/>
	</div>
	<div
		class="bg-dominant h-[35%] w-full rounded-b-xl flex flex-col justify-center p-5 gap-2 group-hover:h-[60%] transition-all duration-500"
	>
		<h1 class="font-semibold text-xl">{campaign.title}</h1>
		<div class="flex justify-between">
			<div class="flex flex-col">
				<p class="text-skin-muted">
					{campaign.amountCollected}
				</p>
				<span class="text-xs text-skin-muted">Raised of {campaign.target}</span>
			</div>
			<div class="flex flex-col">
				<p class="text-skin-muted">{getDaysLeft(`${campaign.endDate}`)}</p>
				<span class="text-xs text-skin-muted">Days Left</span>
			</div>
		</div>
		<div class="flex gap-1 items-center">
			<div class="w-8 h-8 rounded-full shadow-lg bg-light-muted">
				<img class="w-8" src={Profile} alt="profile" />
			</div>
			<span class="text-xs">By {campaign.userName}</span>
		</div>
		<p class="hidden group-hover:line-clamp-3 transition-all duration-300 group-hover:animate-fade">
			{campaign.story}
		</p>
	</div>
</a>
