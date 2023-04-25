<script lang="ts">
	import { elasticScale } from '$lib/transitions/scale';
	import Profile from '$lib/images/profile.png';
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { snackbar } from '$lib/stores/snackbar';
	export let email: string;
</script>

<menu
	class="fixed bg-muted text-skin-base right-2 top-[52px] rounded-xl border-[1px] border-base shadow-xl p-3 z-20
	before:absolute before:content-[''] before:right-[12px] before:bottom-full before:w-0 before:h-0 before:border-[10px] before:border-transparent before:border-b-base
	after:absolute after:content-[''] after:right-[13px] after:bottom-full after:w-0 after:h-0 after:border-[9px] after:border-transparent after:border-b-muted
	"
	id="menu"
	in:elasticScale
>
	<div class="bg-dominant rounded-xl overflow-hidden">
		<div class="flex items-center gap-2 py-3 px-5">
			<div class="flex gap-4 items-center">
				<button class="w-8 h-8 rounded-full shadow-lg bg-light-muted">
					<img class="w-8" src={Profile} alt="profile" />
				</button>
			</div>
			<ul class="text-xs">
				<li class="text-skin-muted">
					{email.split('@')[0][0].toUpperCase() + email.split('@')[0].slice(1)}
				</li>
				<li>{email}</li>
			</ul>
		</div>
		<div class="border-b-[1px] border-base w-full" />
		<ul class="w-full">
			<li>
				<a href="/start" class="p-4 block w-full h-full hover:no-underline hover:bg-light-muted"
					>Start a campaign</a
				>
			</li>
			<li>
				<a href="/" class="p-4 block w-full h-full hover:no-underline hover:bg-light-muted"
					>All campaigns</a
				>
			</li>
			<li>
				<a href="/personal" class="p-4 block w-full h-full hover:no-underline hover:bg-light-muted"
					>My campaigns</a
				>
			</li>
		</ul>
	</div>
	<form
		action="/logout"
		method="POST"
		use:enhance={() => {
			snackbar.promise('Logging out...');

			return async function ({ result }) {
				if (result.type == 'success' || result.type == 'redirect') {
					snackbar.success('Logged out');
					invalidateAll();
				} else {
					snackbar.error('Error in logging out');
				}
				await applyAction(result);
			};
		}}
	>
		<button class="block w-full h-full hover:no-underline text-center py-2" type="submit"
			><i class="fas fa-sign-out-alt mr-1" />Log out</button
		>
	</form>
</menu>
