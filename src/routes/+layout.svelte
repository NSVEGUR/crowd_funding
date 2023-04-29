<script lang="ts">
	import '../app.postcss';
	import Snackbar from '$lib/components/Snackbar.svelte';
</script>

<main class=" text-skin-base h-screen w-screen overflow-hidden relative">
	<div
		class="bg-muted bg-[url('/src/lib/images/gradient-background.png')] h-screen w-screen bg-top bg-[length:100vw] bg-no-repeat"
	>
		<Snackbar />
		<slot><!-- optional fallback --></slot>
	</div>
</main>
