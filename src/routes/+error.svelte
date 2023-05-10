<script lang="ts">
	import { page } from '$app/stores';
	import { snackbar } from '$lib/stores/snackbar';
	import { enhance, applyAction } from '$app/forms';
</script>

<section class="w-full h-full flex flex-col gap-5 items-center justify-center font-medium">
	<h1>There was a problem</h1>
	<div class="flex gap-3 text-4xl">
		<div class="pr-3 border-r-2 border-complementary">
			<h1 class="text-skin-error">{$page.status}</h1>
		</div>
		<div>
			<h2>{$page.error?.message ?? 'Some unknown error occurred'}</h2>
		</div>
	</div>
	<div class="flex gap-5">
		<button
			class="p-2 rounded-lg border-[1px] border-accent"
			on:click={() => {
				location.reload();
			}}>Refresh</button
		>
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
			<button class="p-2 rounded-lg border-[1px] border-accent bg-accent">Go Home</button>
		</form>
	</div>
	<h1>If the issue persists try again later or contact our support team.</h1>
</section>
