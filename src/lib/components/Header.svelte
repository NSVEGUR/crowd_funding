<script lang="ts">
	import Logo from '$lib/images/logo.png';
	import Profile from '$lib/images/profile.png';
	import SearchSVG from '$lib/svg/Search.svelte';
	import BarsSVG from '$lib/svg/Bars.svelte';
	import Command from '$lib/svg/Command.svelte';
	import { toggleNav, toggleMenu, search } from '$lib/stores';
	import type { Session } from '@supabase/supabase-js';
	import { fly } from 'svelte/transition';

	export let session: Session | null;
	export let url: string;

	const toggleOuter = (e: MouseEvent) => {
		const nav = (e.target as HTMLElement).closest('#nav');
		const navBtn = (e.target as HTMLElement).closest('#nav-btn');
		if (!nav && !navBtn && $toggleNav) {
			$toggleNav = !$toggleNav;
		}

		const menu = (e.target as HTMLElement).closest('#menu');
		const menuBtn = (e.target as HTMLElement).closest('#menu-btn');
		if (!menu && !menuBtn && $toggleMenu) {
			$toggleMenu = !$toggleMenu;
		}
	};
</script>

<header class="h-14 relative border-b-[1px] border-base bg-dominant backdrop-blur-lg">
	<button
		class="lg:hidden absolute top-1/2 -translate-y-1/2 left-3 nav-btn text-accent"
		id="nav-btn"
		on:click={() => {
			$toggleNav = !$toggleNav;
		}}
	>
		<BarsSVG />
	</button>
	<div class="absolute left-6 top-1/2 -translate-y-1/2 flex -lg:left-10">
		<div class="flex gap-2 items-center text-xl">
			<div class="w-6">
				<img class="h-full w-full" src={Logo} alt="logo" />
			</div>
			<h4 class="text-skin-base font-medium">Crowd Funding</h4>
		</div>
	</div>
	{#if url == '/' || url == '/personal'}
		<div
			class="-lg:hidden pl-2 flex items-center text-inverted absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[60%] border-[1px] border-base rounded-lg"
			transition:fly={{ y: -300, duration: 300 }}
		>
			<SearchSVG />
			<input
				type="text"
				class="grow bg-transparent p-2 focus:outline-none"
				placeholder="Search"
				bind:value={$search}
			/>
			<div class="flex text-sm items-center pr-2 gap-1">
				<span class="border-[1px] border-base rounded w-6 h-6 flex items-center justify-center">
					<Command />
				</span>
				<span class="border-[1px] border-base w-6 h-6 flex items-center justify-center rounded"
					>K</span
				>
			</div>
		</div>
	{/if}
	{#if session}
		<div class="absolute right-4 top-1/2 -translate-y-1/2 flex gap-4 items-center">
			<button
				class="w-8 h-8 rounded-full shadow-lg bg-light-muted"
				id="menu-btn"
				on:click={() => {
					$toggleMenu = !$toggleMenu;
				}}
			>
				<img class="w-8" src={Profile} alt="profile" />
			</button>
		</div>
	{:else}
		<div class="absolute top-1/2 -translate-y-1/2 right-4">
			<a class="bg-accent text-skin-inverted p-[6px] px-3 rounded-md font-medium" href="/auth"
				>Login</a
			>
		</div>
	{/if}
</header>

<svelte:window on:click={toggleOuter} />
