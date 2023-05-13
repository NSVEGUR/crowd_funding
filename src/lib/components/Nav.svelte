<script lang="ts">
	import { onMount } from 'svelte';
	import { toggleNav } from '$lib/stores';
	import { enhance, applyAction } from '$app/forms';
	import { snackbar } from '$lib/stores/snackbar';

	onMount(() => {
		const navigators = document.querySelectorAll('.hyperlink');
		navigators.forEach((navigator, index) => {
			navigator.addEventListener('click', () => {
				hyperlinks.forEach((link) => {
					link.active = false;
				});
				hyperlinks[index].active = true;
				$toggleNav = false;
			});
		});
	});
	export let hyperlinks: {
		name: string;
		icon: any;
		href: string;
		active: boolean;
	}[];
</script>

<section class="flex h-[calc(100vh-theme(spacing.12))">
	<!-- Navigation -->
	<nav
		class="h-screen border-r-[1px] border-base bg-dominant -lg:fixed -lg:z-50 -lg:w-2/3 {$toggleNav
			? '-lg:-translate-x-0'
			: '-lg:-translate-x-full'} transition-all duration-300 overflow-hidden
			"
		id="nav"
	>
		<ul class="mt-5 p-3 flex flex-col items-start gap-3 w-full h-full text-accent">
			{#each hyperlinks as link}
				{#if link.name === 'Logout'}
					<li class="-lg:w-full">
						<form
							action="/logout"
							method="POST"
							use:enhance={() => {
								snackbar.promise('Logging out...');
								return async function ({ result }) {
									if (result.type == 'success' || result.type == 'redirect') {
										snackbar.success('Logged out');
									} else {
										snackbar.error('Error in logging out');
									}
									await applyAction(result);
								};
							}}
						>
							<button
								type="submit"
								class="group w-full relative p-2 items-center flex justify-center -lg:justify-start gap-2 rounded-3xl {link.active &&
									'bg-accent text-skin-inverted'} hover:bg-accent hover:text-skin-inverted hyperlink hover:rounded-lg transition-all duration-300 "
							>
								<div>
									<svelte:component this={link.icon} />
								</div>
								<span
									class="hidden group-hover:block fixed z-50 w-32 p-1 left-[70px] text-center rounded bg-accent text-skin-inverted before:content-[''] before:absolute before:border-[6px] before:border-transparent before:border-r-accent before:top-1/2 before:-translate-y-1/2 before:-left-3 animate-scale -lg:group-hover:hidden"
									>{link.name}</span
								>
								<span class="lg:hidden">{link.name}</span>
							</button>
						</form>
					</li>
				{:else}
					<li class="-lg:w-full">
						<a
							class="group w-full relative p-2 items-center flex justify-center -lg:justify-start gap-2 rounded-3xl {link.active &&
								'bg-accent text-skin-inverted'} hover:bg-accent hover:text-skin-inverted hyperlink hover:rounded-lg transition-all duration-300"
							href={link.href}
						>
							<div>
								<svelte:component this={link.icon} />
							</div>
							<span
								class="hidden group-hover:block fixed z-50 w-32 p-1 left-[70px] text-center rounded bg-accent text-skin-inverted before:content-[''] before:absolute before:border-[6px] before:border-transparent before:border-r-accent before:top-1/2 before:-translate-y-1/2 before:-left-3 animate-scale -lg:group-hover:hidden"
								>{link.name}</span
							>
							<span class="lg:hidden">{link.name}</span>
						</a>
					</li>
				{/if}
			{/each}
		</ul>
	</nav>
	<section class="p-10 h-screen w-full overflow-scroll -sm:p-3 flex justify-center">
		<div class="w-[80%] -xl:w-[90%] -lg:w-[95%] -sm:w-full h-full">
			<slot><!-- optional fallback --></slot>
		</div>
	</section>
</section>
