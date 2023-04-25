<script lang="ts">
	import Logo from '$lib/images/logo.png';
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import type { ActionData } from './$types';
	import { snackbar } from '$lib/stores/snackbar';
	let toggleLogin = true;
	let duration = 300;
	export let form: ActionData;
	$: error = form?.error;
	$: if (toggleLogin || !toggleLogin) {
		error = undefined;
	}

	$: if (error) {
		setTimeout(() => {
			error = '';
		}, 10000);
	}
</script>

{#if toggleLogin}
	<form
		action="?/login"
		method="POST"
		use:enhance={() => {
			snackbar.promise('Logging in...');
			return async function ({ result }) {
				if (result.type == 'success' || result.type == 'redirect') {
					snackbar.success('Logged in');
					invalidateAll();
				} else {
					snackbar.error('Error in Logging in');
				}
				await applyAction(result);
			};
		}}
		class="w-full h-full flex flex-col gap-3 items-center justify-center"
		in:fly={{ x: 300, duration, delay: duration }}
		out:fly={{ duration }}
	>
		<div class="flex gap-1 items-end mb-5">
			<img src={Logo} alt="logo" class="w-10" />
			<span class="font-medium text-xl">Crowd Funding</span>
		</div>
		<div class="flex flex-col min-w-[30%] gap-2">
			<label for="email">Email *</label>
			<input
				type="email"
				name="email"
				required
				class="bg-transparent focus:outline-none border-[1px] border-base p-3 rounded-lg w-full"
				placeholder="Your email"
			/>
		</div>
		<div class="flex flex-col min-w-[30%] gap-1">
			<label for="password">Password *</label>
			<input
				type="password"
				required
				minlength="6"
				name="password"
				class="bg-transparent focus:outline-none border-[1px] border-base p-3 rounded-lg w-full"
				placeholder="Password"
			/>
		</div>
		{#if error}
			<div>
				<h1 class="text-center text-skin-error">{error}</h1>
			</div>
		{/if}
		<button type="submit" class="bg-inverted text-skin-inverted p-2 min-w-[30%] rounded-lg mt-2"
			>Login</button
		>
		<div class="flex justify-evenly gap-5 min-w-[30%]">
			<button class="p-2 border-[1px] border-base w-full rounded-lg">
				<i class="fab fa-google" />
			</button>
			<button class="p-2 border-[1px] border-base w-full rounded-lg">
				<i class="fab fa-github" />
			</button>
			<button class="p-2 border-[1px] border-base w-full rounded-lg">
				<i class="fab fa-discord" />
			</button>
		</div>
		<div class="text-skin-muted">
			<h1>
				No Account? <button
					class="text-skin-base hover:underline"
					on:click|preventDefault={() => {
						toggleLogin = false;
					}}>Signup Here</button
				>
			</h1>
		</div>
	</form>
{:else}
	<form
		action="?/signup"
		method="POST"
		use:enhance={() => {
			snackbar.promise('Signing up...');
			return async function ({ result }) {
				if (result.type == 'success' || result.type == 'redirect') {
					snackbar.success('Please check your mail to confirm!');
					invalidateAll();
				} else {
					snackbar.error('Error in Signing up');
				}
				await applyAction(result);
			};
		}}
		class="w-full h-full flex flex-col gap-3 items-center justify-center"
		in:fly={{ x: 300, duration, delay: duration }}
		out:fly={{ duration }}
	>
		<div class="flex gap-1 items-end mb-5">
			<img src={Logo} alt="logo" class="w-10" />
			<span class="font-medium text-xl">Crowd Funding</span>
		</div>
		<div class="flex flex-col min-w-[30%] gap-2">
			<label for="email">Email *</label>
			<input
				type="email"
				name="email"
				required
				class="bg-transparent focus:outline-none border-[1px] border-base p-3 rounded-lg w-full"
				placeholder="Your email"
			/>
		</div>
		<div class="flex flex-col min-w-[30%] gap-1">
			<label for="password">Password *</label>
			<input
				type="password"
				name="password"
				required
				minlength="6"
				class="bg-transparent focus:outline-none border-[1px] border-base p-3 rounded-lg w-full"
				placeholder="Password"
			/>
		</div>
		{#if error}
			<div>
				<h1 class="text-center text-skin-error">{error}</h1>
			</div>
		{/if}
		<button type="submit" class="bg-inverted text-skin-inverted p-2 min-w-[30%] rounded-lg mt-2"
			>Signup</button
		>
		<div class="flex justify-evenly gap-5 min-w-[30%]">
			<button class="p-2 border-[1px] border-base w-full rounded-lg">
				<i class="fab fa-google" />
			</button>
			<button class="p-2 border-[1px] border-base w-full rounded-lg">
				<i class="fab fa-github" />
			</button>
			<button class="p-2 border-[1px] border-base w-full rounded-lg">
				<i class="fab fa-discord" />
			</button>
		</div>
		<div class="text-skin-muted">
			<h1>
				Have Account? <button
					class="text-skin-base hover:underline"
					on:click|preventDefault={() => {
						toggleLogin = true;
					}}>Login Here</button
				>
			</h1>
		</div>
	</form>
{/if}
