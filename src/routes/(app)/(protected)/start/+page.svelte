<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { snackbar } from '$lib/stores/snackbar';
	import { invalidateAll } from '$app/navigation';
	import type { ActionData } from './$types';
	import { redirect } from '@sveltejs/kit';
	export let form: ActionData;

	let type = 'Personal';
</script>

<section class="w-full h-full pb-10 relative z-10">
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
		<div class="flex flex-col gap-2 w-full items-center justify-center">
			<label for="image" class="self-start text-skin-muted">Campaign image*</label>
			<input
				type="file"
				name="file"
				required
				accept="image/*"
				class="w-full bg-domniant focus:outline-none border-[1px] border-base rounded-lg p-5"
				placeholder="Image URL of your campaign"
			/>
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
