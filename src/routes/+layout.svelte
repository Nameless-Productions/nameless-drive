<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href="https://thenamelessdev.com/logo.svg" /></svelte:head>
{@render children()}
