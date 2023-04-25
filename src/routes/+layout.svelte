<script lang="ts">
	import '../app.postcss';
	import Snackbar from '$lib/components/Snackbar.svelte';
	import GradientBackground from '$lib/images/gradient-background.png';
</script>

<main class="bg-dominant text-skin-base h-screen w-screen overflow-hidden relative">
	<div class="absolute top-0 z-0">
		<img src={GradientBackground} alt="gradient-background" />
	</div>
	<Snackbar />
	<slot><!-- optional fallback --></slot>
</main>
