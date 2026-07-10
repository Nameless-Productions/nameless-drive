<script lang="ts">
	import { page } from '$app/stores';
	import Setup from '$lib/components/Setup.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import './layout.css';

	let { children, data } = $props();
</script>

<svelte:head><link rel="icon" href="https://thenamelessdev.com/logo.svg" /></svelte:head>

{#if data.isSetup}
	{#if !$page.url.pathname.startsWith('/login')}
		<Navbar />
	{/if}
	<main class="m-2 text-neutral-300">{@render children()}</main>
{:else}
	<Setup />
{/if}
