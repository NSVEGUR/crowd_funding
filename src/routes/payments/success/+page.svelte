<script lang="ts">
	import { draw } from 'svelte/transition';
</script>

<section class="h-full w-full flex flex-col items-center justify-center">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="w-20 h-20 text-skin-okay"
	>
		<path
			in:draw={{ delay: 200, duration: 1000 }}
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</svg>
	<h1 class="text-xl">Payment Successful</h1>
	<a href="/" class="bg-inverted text-skin-inverted p-3 rounded-lg mt-5">Return To Home</a>
</section>
