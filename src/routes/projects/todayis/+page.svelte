<script>
	import { onMount } from 'svelte';

	let weekday = '';

	onMount(() => {
		weekday = new Date().toLocaleDateString('en-US', {
			weekday: 'long'
		});
	});
</script>

<svelte:head>
	<title>Today is {weekday}.</title>
</svelte:head>

<main>
	<div class="container">
		<h1 class="weekday-display">
			{#if weekday}
				Today is {weekday}.
			{:else}
				Loading...
			{/if}
		</h1>
	</div>
</main>

<style>
	.main {
		background-color: black !important;
		padding: 0 !important;
		margin: 0 !important;
	}

	.weekday-display {
		color: white;
		font-size: 10rem;
		text-align: center;
		margin: 0;
		font-family: system-ui, -apple-system, sans-serif;
	}
</style>
