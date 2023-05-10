<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { snackbar } from '$lib/stores/snackbar';
	import Profile from '$lib/images/profile.png';
	import { getDaysLeft, timestampToDate } from '$lib/utils/date';
	import type { ActionData, PageData } from './$types';
	import { supabaseClient } from '$lib/supabase';
	import { slide } from 'svelte/transition';
	export let data: PageData;
	export let form: ActionData;
	let imgUrl: string | null = null;
	let previousImgUrl: string | null = null;
	let amount = 0;
	let toggleEdit = false;
	let toggleWithdraw = false;
	const downloadImage = async (path: string) => {
		try {
			const { data, error } = await supabaseClient.storage.from('campaign_images').download(path);
			if (error) {
				throw error;
			}
			const url = URL.createObjectURL(data);
			imgUrl = url;
			previousImgUrl = imgUrl;
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message);
			}
		}
	};
	function formatDate(date: Date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [year, month, day].join('-');
	}
	const { campaign } = data;
	let endDate = formatDate(campaign.endDate);
	if (campaign.image) {
		downloadImage(campaign.image);
	}
	const updateImage = () => {
		const fileObj = document.getElementById('file') as any;
		if (FileReader && fileObj && fileObj.files) {
			const fr = new FileReader();
			fr.addEventListener('load', () => {
				imgUrl = fr.result as string;
			});
			fr.readAsDataURL(fileObj.files[0]);
		} else {
			console.error('File reader is not supported');
		}
	};
</script>

<section class="w-full h-full mb-20 -md:mb-40">
	{#if toggleEdit}
		<div class="flex justify-end">
			<button
				class="bg-accent p-2 px-3 rounded-lg"
				on:click={() => {
					toggleEdit = false;
				}}>Cancel Editing</button
			>
		</div>
		<div class="flex w-full items-center justify-center">
			<h1 class="text-center text-skin-base font-bold text-4xl">Editing a Campaign</h1>
		</div>
		<form
			action="?/update"
			method="POST"
			use:enhance={({ data: formData }) => {
				snackbar.promise('Updating campaign...');
				formData.append('campaignId', campaign.id);
				formData.append('imgChanged', imgUrl == previousImgUrl ? 'false' : 'true');
				return async function ({ result }) {
					if (result.type == 'success' || result.type == 'redirect') {
						snackbar.success('Updating campaign successfully');
					} else if (result.type == 'failure' || result.type == 'error') {
						snackbar.error('Updating in creating');
					}
					await applyAction(result);
				};
			}}
			class="flex flex-col h-full gap-5"
		>
			<div class="flex gap-10 w-full justify-evenly mt-5 -md:flex-col">
				<div class="flex flex-col gap-2 w-full">
					<label for="name" class="text-skin-muted">Your Name</label>
					<input
						type="text"
						name="name"
						required
						minlength="3"
						class="bg-dominant border-[1px] focus:outline-none border-base h-12 rounded-lg w-full p-5"
						placeholder="Jhon"
						bind:value={campaign.userName}
					/>
				</div>
				<div class="flex flex-col gap-2 w-full">
					<label for="title" class="text-skin-muted">Campaign Title</label>
					<input
						type="text"
						name="title"
						minlength="5"
						class="bg-dominant border-[1px] focus:outline-none border-base h-12 rounded-lg w-full p-5"
						placeholder="Title"
						bind:value={campaign.title}
					/>
				</div>
			</div>
			<label for="type" class="text-skin-muted">Campaign Type *</label>
			<select
				name="type"
				class="p-3 bg-dominant rounded-lg focus:outline-none"
				bind:value={campaign.type}
			>
				<option value="Personal">Personal</option>
				<option value="Education">Education</option>
				<option value="NGO">NGO</option>
				<option value="Others">Others</option>
			</select>
			{#if campaign.type === 'Others'}
				<div class="flex flex-col gap-2 w-full items-center justify-center">
					<label for="others" class="self-start text-skin-muted">Campaign Type Name(others)*</label>
					<input
						type="text"
						name="others"
						required
						class="w-full bg-domniant focus:outline-none border-[1px] h-12 border-base rounded-lg p-5"
						placeholder="Environment"
						bind:value={campaign.othersType}
					/>
				</div>
			{/if}
			<div class="flex flex-col gap-2 w-full items-center">
				<label for="story" class="self-start text-skin-muted">Story *</label>
				<textarea
					name="story"
					id="story"
					minlength="10"
					rows="10"
					required
					class="bg-dominant border-[1px] focus:outline-none border-base rounded-lg w-full p-5"
					placeholder="Write your story..."
					bind:value={campaign.story}
				/>
			</div>
			<div class="flex gap-10 w-full justify-evenly mt-5 -md:flex-col">
				<div class="flex flex-col gap-2 w-full">
					<label for="goal" class="text-skin-muted">Goal *</label>
					<input
						type="number"
						name="goal"
						step="0.1"
						required
						class="bg-dominant border-[1px] focus:outline-none border-base h-12 rounded-lg w-full p-5"
						placeholder="Dollars &#36;"
						bind:value={campaign.target}
					/>
				</div>
				<div class="flex flex-col gap-2 w-full">
					<label for="date" class="text-skin-muted">End Date *</label>
					<input
						type="date"
						name="date"
						required
						class="bg-dominant border-[1px] focus:outline-none border-base h-12 rounded-lg w-full p-5 text-skin-base"
						bind:value={endDate}
					/>
				</div>
			</div>
			<div class="flex flex-col gap-2 w-full items-start justify-center">
				<label for="file" class="self-start text-skin-muted">Campaign image*</label>
				<div class="flex gap-3 w-full">
					{#if imgUrl}
						<div class="w-full flex-grow">
							<img
								class="w-full h-96 object-cover rounded-lg"
								src={imgUrl}
								alt="campaignImage"
								id="campaign-image"
							/>
						</div>
					{/if}
					<label
						for="file"
						class="border-[1px] border-base bg-dominant rounded-lg p-2 cursor-pointer h-max text-skin-muted"
						><input
							type="file"
							name="file"
							id="file"
							hidden
							accept=".png,.jpeg,.jpg,.svg"
							placeholder="Image URL of your campaign"
							on:change={updateImage}
						/>{#if imgUrl}
							<span>Edit</span>
						{:else}
							<span>Choose Image</span>
						{/if}
					</label>
				</div>
			</div>
			{#if form?.error}
				<p class="text-skin-error text-center">{form.error}</p>
			{/if}
			<div class="flex w-full items-center justify-center gap-3">
				<button
					class="text-center text-accent font-medium text-lg p-2 px-3 rounded-lg border-[1px] border-accent"
					on:click|preventDefault={() => {
						toggleEdit = false;
					}}>Cancel Editing</button
				>
				<button
					type="submit"
					class="text-center bg-accent text-skin-base font-medium text-lg p-2 px-3 rounded-lg border-[1px] border-accent"
					>Update campaign</button
				>
			</div>
		</form>
	{:else}
		<h1 class="text-center text-5xl font-bold mb-5">
			{campaign.title} ({campaign.type === 'Others' ? campaign.othersType : campaign.type})
		</h1>
		<div class="flex gap-7 w-full items-start -md:flex-col -md:mb-24">
			<div class="w-[70%] -lg:w-[60%] -md:w-full">
				<div class="relative rounded-lg group overflow-hidden">
					{#if imgUrl}
						<img
							src={previousImgUrl}
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
						<div class="-md:hidden">
							<h1 class="text-3xl font-medium my-2">About Campaign</h1>
							<p class="text-skin-muted text-justify">{data.campaign.story}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="w-[30%] -lg:w-[40%] -md:w-full flex flex-col gap-3">
				<div class="flex flex-col gap-3 -md:hidden">
					<a
						class="bg-accent rounded-lg p-3 text-center font-medium"
						href="/protected/{campaign.id}/withdraw"
					>
						Withdraw
					</a>
					<button
						class="rounded-lg border-[1px] border-accent p-3"
						on:click={() => {
							toggleEdit = true;
						}}
					>
						<i class="fas fa-pen mr-2" /> Edit
					</button>
					<div class="w-full text-right">
						<h1 class="text-3xl font-bold">
							{campaign.amountCollected.toLocaleString('en-US')} &#36;
						</h1>
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
				<div class="border-[1px] border-base rounded-lg mt-5">
					<h1
						class="text-xl font-bold border-b-[1px] border-base py-2 flex items-baseline gap-2 justify-center"
					>
						Withdrawal Requests <i class="fas fa-download text-accent fa-xs" />
					</h1>
					<div class="max-h-[500px] overflow-scroll p-3 flex flex-col gap-2">
						{#each campaign.withdrawalRequests as { amount, createdAt, approved }}
							<div class="flex justify-between items-center">
								<div class="text-accent font-medium">{amount} &#36;</div>
								<div class="text-skin-muted">{timestampToDate(createdAt.toString())}</div>
								<div class="font-medium">{approved ? 'Approved' : 'Pending'}</div>
							</div>
						{/each}
						{#if campaign.withdrawalRequests.length == 0}
							<p class="text-skin-muted text-center">No previous withdrawals</p>
						{/if}
					</div>
				</div>
			</div>
		</div>
		<button
			class="fixed bottom-20 right-5 md:hidden border-[1px] border-accent bg-muted text-accent text-xl rounded-full p-3 w-12 h-12 flex items-center justify-center"
			on:click={() => {
				toggleEdit = true;
			}}
		>
			<i class="fas fa-pen" />
		</button>
		<div class="fixed bottom-0 left-0 w-full bg-dominant p-3 rounded-lg shadow-md md:hidden">
			<a
				class="bg-accent text-skin-base p-3 w-full rounded-lg text-center flex items-center justify-center font-medium"
				href="/protected/{campaign.id}/withdraw">Withdraw</a
			>
		</div>
	{/if}
</section>

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
