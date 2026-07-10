<script lang="ts">
	let { data } = $props();
</script>

<p class="font-bold text-xl">Create API key</p>

{#if data.newApiKey}
	<p>Your API key: <br />{data.newApiKey}</p>
{:else}
	<p>No API key was returned. Try again.</p>
{/if}
