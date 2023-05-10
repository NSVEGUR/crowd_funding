<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { snackbar } from '$lib/stores/snackbar';
	import type { ActionData } from './$types';
	export let form: ActionData;

	let type = 'Personal';
	let imgUrl: string | undefined = undefined;

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

<section class="w-full h-full mb-20 relative z-10">
	<div class="flex w-full items-center justify-center">
		<h1 class="text-center text-skin-base font-bold text-4xl">Start a Campaign</h1>
	</div>
	<form
		action="?/create"
		method="POST"
		use:enhance={({ form }) => {
			snackbar.promise('Creating campaign...');
			return async function ({ result }) {
				if (result.type == 'success' || result.type == 'redirect') {
					snackbar.success('Created campaign successfully');
				} else if (result.type == 'failure' || result.type == 'error') {
					snackbar.error('Error in creating');
				}
				await applyAction(result);
			};
		}}
		class="flex flex-col h-full gap-5"
	>
		<div class="flex gap-10 w-full justify-evenly mt-5 -md:flex-col">
			<div class="flex flex-col gap-2 w-full">
				<label for="name" class="text-skin-muted">Your Name *</label>
				<input
					type="text"
					name="name"
					required
					minlength="3"
					class="bg-dominant border-[1px] focus:outline-none border-base h-12 rounded-lg w-full p-5"
					placeholder="Jhon"
				/>
			</div>
			<div class="flex flex-col gap-2 w-full">
				<label for="title" class="text-skin-muted">Campaign Title *</label>
				<input
					type="text"
					name="title"
					minlength="5"
					class="bg-dominant border-[1px] focus:outline-none border-base h-12 rounded-lg w-full p-5"
					placeholder="Title"
				/>
			</div>
		</div>
		<label for="type" class="text-skin-muted">Campaign Type *</label>
		<select name="type" class="p-3 bg-dominant rounded-lg focus:outline-none" bind:value={type}>
			<option value="Personal">Personal</option>
			<option value="Education">Education</option>
			<option value="NGO">NGO</option>
			<option value="Others">Others</option>
		</select>
		{#if type === 'Others'}
			<div class="flex flex-col gap-2 w-full items-center justify-center">
				<label for="others" class="self-start text-skin-muted">Campaign Type Name(others)*</label>
				<input
					type="text"
					name="others"
					required
					class="w-full bg-domniant focus:outline-none border-[1px] h-12 border-base rounded-lg p-5"
					placeholder="Environment"
				/>
			</div>
		{/if}
		<div class="flex flex-col gap-2 w-full items-center">
			<label for="story" class="self-start text-skin-muted">Story*</label>
			<textarea
				name="story"
				id="story"
				minlength="10"
				rows="10"
				required
				class="bg-dominant border-[1px] focus:outline-none border-base rounded-lg w-full p-5"
				placeholder="Write your story..."
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
				/>
			</div>
			<div class="flex flex-col gap-2 w-full">
				<label for="date" class="text-skin-muted">End Date *</label>
				<input
					type="date"
					name="date"
					required
					class="bg-dominant border-[1px] focus:outline-none border-base h-12 rounded-lg w-full p-5 text-skin-base"
				/>
			</div>
		</div>
		<div class="flex flex-col gap-2 w-full items-start justify-center">
			<label for="image" class="self-start text-skin-muted">Campaign image*</label>
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
						required
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
		<div class="flex w-full items-center justify-center">
			<button
				type="submit"
				class="text-center bg-accent text-skin-base font-medium text-lg p-2 px-3 rounded-lg"
				>Submit new campaign</button
			>
		</div>
	</form>
</section>

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
