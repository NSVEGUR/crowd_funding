<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { snackbar } from '$lib/stores/snackbar';
	import type { ActionData } from './$types';
	export let form: ActionData;
	let amount = 0.5;
	let transit: string | number;
	let institution: string | number;
	let account: string | number;
	$: if (transit && transit.toString().length > 5) {
		transit = transit.toString().slice(0, 5);
	}
	$: if (institution && institution.toString().length > 3) {
		institution = institution.toString().slice(0, 3);
	}
	$: if (account && account.toString().length > 7) {
		account = account.toString().slice(0, 7);
	}
</script>

<section class="w-full h-full mb-20 relative z-10">
	<div class="flex w-full items-center justify-center">
		<h1 class="text-center text-skin-base font-bold text-4xl">Withdrawal form</h1>
	</div>
	<form
		action="?/withdraw"
		method="POST"
		use:enhance={({ data, cancel }) => {
			if (!amount) {
				snackbar.error('Please provide amount');
				return cancel();
			}
			snackbar.promise('Requesting for withdrawal...');
			return async function ({ result }) {
				if (result.type == 'failure') {
					snackbar.error('Invalid form');
				}
				if (result.type == 'success' || result.type == 'redirect') {
					snackbar.success('Please allow us 1 business day to process your amount', '', 8000);
				}
				await applyAction(result);
			};
		}}
		class="flex flex-col h-full gap-5"
	>
		<div class="flex gap-10 w-full justify-evenly mt-5 -md:flex-col">
			<div class="flex flex-col gap-2 w-full">
				<label for="amount" class="text-skin-muted">Withdrawal Amount *</label>
				<input
					type="number"
					name="amount"
					step="0.1"
					placeholder="100 &#36;"
					required
					min="0.5"
					bind:value={amount}
					class="bg-muted border-[1px] border-accent focus:outline-none p-3 rounded-lg"
				/>
			</div>
			<div class="flex flex-col gap-2 w-full">
				<label for="transit" class="text-skin-muted">Transit Number (5 digits) *</label>
				<input
					type="number"
					name="transit"
					placeholder="XXXXX"
					required
					minlength="5"
					bind:value={transit}
					class="bg-muted border-[1px] border-accent focus:outline-none p-3 rounded-lg"
				/>
			</div>
		</div>
		<div class="flex gap-10 w-full justify-evenly mt-5 -md:flex-col">
			<div class="flex flex-col gap-2 w-full">
				<label for="institution" class="text-skin-muted">Institution Number (3 digits) *</label>
				<input
					type="number"
					name="institution"
					placeholder="XXX"
					required
					minlength="3"
					bind:value={institution}
					class="bg-muted border-[1px] border-accent focus:outline-none p-3 rounded-lg"
				/>
			</div>
			<div class="flex flex-col gap-2 w-full">
				<label for="account" class="text-skin-muted">Account Number (7 digits) *</label>
				<input
					type="number"
					name="account"
					placeholder="XXXXXXX"
					required
					minlength="7"
					bind:value={account}
					class="bg-muted border-[1px] border-accent focus:outline-none p-3 rounded-lg"
				/>
			</div>
		</div>
		{#if form?.error}
			<p class="text-skin-error text-center">{form.error}</p>
		{/if}
		<div class="flex w-full items-center justify-center">
			<button
				type="submit"
				class="text-center bg-accent text-skin-base font-medium text-lg p-2 px-3 rounded-lg"
				>Request for withdrawal</button
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
