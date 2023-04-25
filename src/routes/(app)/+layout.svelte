<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import SquaresSVG from '$lib/svg/Squares.svelte';
	import PlusCircleSVG from '$lib/svg/PlusCircle.svelte';
	import UserCircleSVG from '$lib/svg/UserCircle.svelte';
	import LogoutSVG from '$lib/svg/Logout.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import type { LayoutData } from './$types';
	import { toggleMenu } from '$lib/stores';
	import Menu from '$lib/components/Menu.svelte';
	export let data: LayoutData;
	const hyperlinks = [
		{
			name: 'All Campaigns',
			icon: SquaresSVG,
			href: '/',
			active: data.url == '/'
		},
		{
			name: 'Start Campaign',
			icon: PlusCircleSVG,
			href: '/start',
			active: data.url.includes('/start')
		},
		{
			name: 'My Campaigns',
			icon: UserCircleSVG,
			href: '/personal',
			active: data.url.includes('/personal')
		},
		{
			name: 'Logout',
			icon: LogoutSVG,
			href: '/',
			active: false
		}
	];
</script>

<Header session={data.session} url={data.url} />
<Nav {hyperlinks}>
	{#if data.session?.user.email && $toggleMenu}
		<Menu email={data.session.user.email} />
	{/if}
	{#key data.url}
		<PageTransition duration={300}>
			<slot />
		</PageTransition>
	{/key}
</Nav>
