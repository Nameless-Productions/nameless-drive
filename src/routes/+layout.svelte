<script lang="ts">
	import Setup from '$lib/components/Setup.svelte';
	import './layout.css';

	let { children, data } = $props();
</script>

<svelte:head><link rel="icon" href="https://thenamelessdev.com/logo.svg" /></svelte:head>


{#if data.isSetup}
	<main class="m-2 text-neutral-300">{@render children()}</main>
	{:else}
	<Setup />
{/if}
