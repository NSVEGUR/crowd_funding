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
		class="w-20 h-20 text-skin-error"
	>
		<path
			in:draw={{ delay: 200, duration: 1000 }}
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
		/>
	</svg>
	<h1 class="text-xl">Payment Canceled</h1>
	<a href="/" class="bg-inverted text-skin-inverted p-3 rounded-lg mt-5">Return To Home</a>
</section>
