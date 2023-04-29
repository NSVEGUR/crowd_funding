<script lang="ts">
	import { page } from '$app/stores';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { snackbar } from '$lib/stores/snackbar';
	import Profile from '$lib/images/profile.png';
	import { getDaysLeft } from '$lib/utils/date';
	import type { PageData } from './$types';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { scale, slide } from 'svelte/transition';
	export let data: PageData;
	let anonymous = false;
	let toggleShare = false;
	let toggleDonate = false;
	let donationSuggestions = [
		{
			amount: '20',
			active: false
		},
		{
			amount: '50',
			active: false
		},
		{
			amount: '100',
			active: true
		},
		{
			amount: 'Others',
			active: false
		}
	];
	let imageUrl: string | null = null;
	let amount = 0;
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
	const { campaign } = data;
	if (campaign.image) {
		downloadImage(campaign.image);
	}
	onMount(() => {
		const personal = ['20', '50', '100', 'Others'];
		const ngo = ['100', '200', '500', 'Others'];
		const education = ['100', '200', '500', 'Others'];
		if (campaign.type == 'Personal') {
			donationSuggestions.forEach((suggestion, index) => {
				suggestion.amount = personal[index];
			});
		} else if (campaign.type == 'NGO') {
			donationSuggestions.forEach((suggestion, index) => {
				suggestion.amount = ngo[index];
			});
		} else if (campaign.type == 'Education') {
			donationSuggestions.forEach((suggestion, index) => {
				suggestion.amount = education[index];
			});
		}
		donationSuggestions = [...donationSuggestions];
		amount = parseFloat(
			donationSuggestions.filter((suggestion) => suggestion.active == true)[0].amount
		);
	});

	const toggleOuter = (e: MouseEvent) => {
		const menu = (e.target as HTMLElement).closest('#menu-share');
		const menuBtn = (e.target as HTMLElement).closest('#menu-share-btn');
		const donateMenu = (e.target as HTMLElement).closest('#menu-donate');
		const donateMenuBtn = (e.target as HTMLElement).closest('#menu-donate-btn');
		if (toggleShare && !menu && !menuBtn) {
			toggleShare = false;
		}
		if (toggleDonate && !donateMenu && !donateMenuBtn) {
			toggleDonate = false;
		}
	};
	const sharable = {
		url: $page.url.href,
		title: 'Crowd Funding',
		message: campaign.title
	};
</script>

<section class="w-full h-full pb-10 overflow-scroll">
	<h1 class="text-center text-5xl font-bold mb-5">
		{campaign.title} ({campaign.type === 'Others' ? campaign.othersType : campaign.type})
	</h1>
	<div class="flex gap-3 w-full items-start -md:flex-col">
		<div class="w-[70%] -lg:w-[60%] -md:w-full">
			<div class="relative rounded-lg group overflow-hidden">
				{#if imageUrl}
					<img
						src={imageUrl}
						alt={campaign.title}
						class="w-full h-96 object-cover group-hover:scale-150 transition-all duration-500"
					/>
				{:else}
					<div class="w-full h-96 bg-light-muted" />
				{/if}
				<div
					class="hidden absolute w-full h-full inset-0 bg-black bg-opacity-70 group-hover:block "
				/>
				<div
					class="hidden absolute top-1/2 -translate-y-1/2 right-5 group-hover:flex flex-col gap-3 text-right  text-skin-inverted animate-fade"
				>
					<div>
						<h1 class="text-2xl font-semibold">{getDaysLeft(`${data.campaign.endDate}`)}</h1>
						<h2 class="font-medium text-xl">Days Left</h2>
					</div>
					<div>
						<h1 class="text-2xl font-semibold">
							{data.campaign.amountCollected.toLocaleString('en-US')}
						</h1>
						<h2 class="font-medium text-xl">
							Raised of {data.campaign.target.toLocaleString('en-US')}
						</h2>
					</div>
					<div>
						<h1 class="text-2xl font-semibold">{campaign.donations.length}</h1>
						<h2 class="font-medium text-xl">Total supporters</h2>
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-5 py-5">
				<div class="flex flex-col gap-3">
					<div class="flex justify-between">
						<div class="flex gap-1 items-center">
							<div class="w-8 h-8 rounded-full bg-light-muted">
								<img class="w-8" src={Profile} alt="profile" />
							</div>
							<div class="flex flex-col">
								<span class="text-xs">By {campaign.userName}</span>
								<span class="text-xs text-skin-muted"
									>{`${campaign.user.campaigns.length} ${
										campaign.user.campaigns.length <= 1 ? 'campaign' : 'campaigns'
									}`}</span
								>
							</div>
						</div>
					</div>
					<div>
						<h1 class="text-3xl font-medium my-2">About Campaign</h1>
						<p class="text-skin-muted text-justify">{data.campaign.story}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="w-[30%] -lg:w-[40%] -md:w-full flex flex-col gap-3">
			<div class="flex justify-evenly">
				{#each donationSuggestions as { amount: donation, active }, index}
					<button
						class="border-[1px] border-accent p-1 rounded-lg text-center w-16 {active
							? 'bg-accent'
							: 'bg-transparent'}"
						on:click={() => {
							donationSuggestions.forEach((suggestion) => {
								suggestion.active = false;
							});
							donationSuggestions[index].active = true;
							const active = donationSuggestions.filter(
								(suggestion) => suggestion.active == true
							)[0];
							if (active.amount === 'Others') {
								amount = 10;
							} else {
								amount = parseFloat(active.amount);
							}
						}}
					>
						{#if donation === 'Others'}
							{donation}
						{:else}
							{donation} &#36;
						{/if}
					</button>
				{/each}
			</div>
			{#if donationSuggestions[3].active === true}
				<input
					type="number"
					name="amount"
					step="0.1"
					placeholder="500 &#36;"
					bind:value={amount}
					class="bg-muted border-[1px] border-accent focus:outline-none p-3 rounded-lg"
				/>
			{/if}
			<form
				class="flex flex-col gap-2"
				action="?/donate"
				method="POST"
				use:enhance={({ data }) => {
					snackbar.promise('Redirecting to payment page...');
					data.append('campaignId', `${campaign.id}`);
					data.append('amount', `${amount}`);
					data.append('anonymous', `${anonymous}`);
					return async function ({ result }) {
						snackbar.success('Redirected');
						if (result.type == 'success') {
							invalidateAll();
						}
						await applyAction(result);
					};
				}}
			>
				<div class="self-end">
					<label for="anonymous" class="text-sm">Make my donation anonymous</label>
					<input type="checkbox" id="anonymous" bind:checked={anonymous} />
				</div>
				<button class="bg-accent rounded-lg p-3">
					<i class="fas fa-heart" /> Donate
				</button>
			</form>
			<button
				class="rounded-lg border-[1px] border-accent p-3"
				id="menu-share-btn"
				on:click={() => {
					toggleDonate = false;
					toggleShare = true;
				}}
			>
				<i class="fas fa-share-alt mr-2" /> Share
			</button>
			<div class="w-full text-right">
				<h1 class="text-3xl font-bold">{campaign.amountCollected.toLocaleString('en-US')} &#36;</h1>
				<h2 class="text-skin-muted text-lg">
					raised of <span class="text-skin-base"
						>{campaign.target.toLocaleString('en-US')} &#36;</span
					> goal
				</h2>
				<div class="w-full border-[1px] border-accent h-3 rounded-lg mt-3 overflow-hidden">
					<div
						class="bg-accent h-full"
						style="width: {(campaign.amountCollected / campaign.target) * 100}%;"
					/>
				</div>
			</div>
			<div class="flex justify-between">
				<h2 class="text-2xl font-bold">
					{campaign.donations.length}
					<span class="text-skin-muted text-base font-normal">supporters</span>
				</h2>
				<h2 class="text-2xl font-bold">
					{getDaysLeft(`${campaign.endDate}`)}
					<span class="text-skin-muted text-base font-normal"
						>{getDaysLeft(`${campaign.endDate}`) == 1 ? 'day' : 'days'} left</span
					>
				</h2>
			</div>
			<div class="border-[1px] border-base rounded-lg mt-5">
				<h1
					class="text-xl font-bold border-b-[1px] border-base py-2 flex items-baseline gap-2 justify-center"
				>
					Donors <i class="fas fa-hand-holding-usd text-accent" />
				</h1>
				<div class="max-h-[500px] overflow-scroll p-3 flex flex-col gap-2">
					{#each campaign.donations as { amount, user, anonymous }}
						<div class="flex justify-between items-center">
							{#if anonymous}
								<div class="flex gap-2 items-center">
									<div
										class=" bg-light-muted w-8 h-8 rounded-full flex justify-center items-center text-sm"
									>
										AN
									</div>
									<span class="font-light">Anonymous</span>
								</div>{:else if user.name}
								<div class="flex gap-2 items-center">
									<div
										class=" bg-light-muted w-8 h-8 rounded-full flex justify-center items-center text-sm"
									>
										{user.name.slice(0, 2).toUpperCase()}
									</div>
									<span class="font-medium">{user.name}</span>
								</div>
							{:else}
								<div class="flex gap-2 items-center">
									<div
										class=" bg-light-muted w-8 h-8 rounded-full flex justify-center items-center text-sm"
									>
										{user.email.slice(0, 2).toUpperCase()}
									</div>
									<span class="font-medium">{user.email}</span>
								</div>
							{/if}
							<span class="text-accent font-medium">{amount} &#36;</span>
						</div>
					{/each}
					{#if campaign.donations.length == 0}
						<p class="text-skin-muted text-center">No Donators, be the first one.</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<div class="fixed bottom-5 right-5 flex flex-col gap-5 md:hidden">
		<button
			class="bg-accent text-xl rounded-full p-3 w-12 h-12 flex items-center justify-center"
			id="menu-donate-btn"
			on:click={() => {
				toggleDonate = true;
			}}
		>
			<i class="fas fa-hand-holding-usd" />
		</button>
		<button
			class="border-[1px] border-accent bg-muted text-accent text-xl rounded-full p-3 w-12 h-12 flex items-center justify-center"
			id="menu-share-btn"
			on:click={() => {
				toggleDonate = false;
				toggleShare = true;
			}}
		>
			<i class="fas fa-share-alt" />
		</button>
	</div>
</section>

{#if toggleShare}
	<div class="fixed h-full w-full bg-black bg-opacity-40 inset-0" />
	<div
		class="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -lg:w-[80%] -sm:w-[100%] -sm:top-16 -sm:-translate-y-0 -sm:h-[100%] shadow-xl"
		transition:scale
	>
		<menu class="flex flex-col gap-5 bg-dominant w-full h-full rounded-lg p-5" id="menu-share">
			<button
				class="self-end"
				on:click={() => {
					toggleShare = false;
				}}
			>
				<i class="fas fa-times" />
			</button>
			<h1 class="text-center text-xl font-bold my-5">
				Share <span class="text-accent">{campaign.title}</span> Campaign
			</h1>
			<ul class="grid grid-cols-3 gap-10">
				<li class="flex flex-col items-center justify-center">
					<a
						href="https://www.facebook.com/share.php?u={sharable.url}"
						class="w-8 h-8 rounded-full flex items-center justify-center bg-light-muted"
						><i class="fab fa-facebook" /></a
					> <span>Facebook</span>
				</li>
				<li class="flex flex-col items-center justify-center">
					<a
						href="https://twitter.com/share?url={sharable.url}&text={sharable.message}"
						class="w-8 h-8 rounded-full flex items-center justify-center bg-light-muted"
						><i class="fab fa-twitter" /></a
					><span>Twitter</span>
				</li>
				<li class="flex flex-col items-center justify-center">
					<a
						href="whatsapp://send?text={sharable.url}"
						data-action="share/whatsapp/share"
						class="w-8 h-8 rounded-full flex items-center justify-center bg-light-muted"
						><i class="fab fa-whatsapp" /></a
					><span>Whatsapp</span>
				</li>
				<li class="flex flex-col items-center justify-center">
					<a
						href="https://linkedin.com/sharing/share-offsite/?url={sharable.url}"
						class="w-8 h-8 rounded-full flex items-center justify-center bg-light-muted"
						><i class="fab fa-linkedin" /></a
					> <span>Linkedin</span>
				</li>
				<li class="flex flex-col items-center justify-center">
					<button
						class="w-8 h-8 rounded-full flex items-center justify-center bg-light-muted text-accent"
						on:click={async () => {
							try {
								await navigator.clipboard.writeText(sharable.url);
								snackbar.success('Copied to clipboard');
								toggleShare = false;
							} catch (err) {
								console.error('Failed to copy: ', err);
							}
						}}><i class="fas fa-link" /></button
					><span>Copy Link</span>
				</li>
			</ul>
		</menu>
	</div>
{/if}

{#if toggleDonate}
	<section class="md:hidden">
		<div class="fixed h-full w-full bg-black bg-opacity-40 inset-0" />
		<div class="fixed w-full bottom-0 right-0 shadow-xl" transition:slide>
			<menu class="bg-muted w-full h-full rounded-t-lg p-5" id="menu-donate">
				<div class="flex justify-evenly">
					{#each donationSuggestions as { amount: donation, active }, index}
						<button
							class="border-[1px] border-accent p-1 rounded-lg text-center w-16 {active
								? 'bg-accent'
								: 'bg-transparent'}"
							on:click={() => {
								donationSuggestions.forEach((suggestion) => {
									suggestion.active = false;
								});
								donationSuggestions[index].active = true;
								const active = donationSuggestions.filter(
									(suggestion) => suggestion.active == true
								)[0];
								if (active.amount === 'Others') {
									amount = 10;
								} else {
									amount = parseFloat(active.amount);
								}
							}}
						>
							{#if donation === 'Others'}
								{donation}
							{:else}
								{donation} &#36;
							{/if}
						</button>
					{/each}
				</div>
				{#if donationSuggestions[3].active === true}
					<input
						type="number"
						name="amount"
						step="0.1"
						placeholder="500 &#36;"
						bind:value={amount}
						class="bg-muted border-[1px] border-accent focus:outline-none p-3 rounded-lg w-full my-3"
					/>
				{/if}
				<form
					class="flex flex-col gap-2"
					action="?/donate"
					method="POST"
					use:enhance={({ data }) => {
						snackbar.promise('Redirecting to payment page...');
						data.append('campaignId', `${campaign.id}`);
						data.append('amount', `${amount}`);
						data.append('anonymous', `${anonymous}`);
						return async function ({ result }) {
							snackbar.success('Redirected');
							if (result.type == 'success') {
								invalidateAll();
							}
							await applyAction(result);
						};
					}}
				>
					<div class="self-end mt-3">
						<label for="anonymous" class="text-sm">Make my donation anonymous</label>
						<input type="checkbox" id="anonymous" bind:checked={anonymous} />
					</div>
					<button class="bg-accent rounded-lg p-3">
						<i class="fas fa-heart" /> Donate
					</button>
				</form>
				<button
					class="rounded-lg border-[1px] border-accent p-3 w-full mt-5"
					id="menu-share-btn"
					on:click={() => {
						toggleDonate = false;
						toggleShare = true;
					}}
				>
					<i class="fas fa-share-alt mr-2" /> Share
				</button>
			</menu>
		</div>
	</section>
{/if}

<svelte:window on:click={toggleOuter} />

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
