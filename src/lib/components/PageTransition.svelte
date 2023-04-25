<script lang="ts">
	import { fly } from 'svelte/transition';
	export let duration: number;
</script>

<div in:fly={{ y: 300, duration, delay: duration }} out:fly={{ duration }} class="overflow-hidden">
	<slot><!-- optional fallback --></slot>
</div>
