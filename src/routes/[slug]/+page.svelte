<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();

	let parentFolder = $derived(data.parent ?? '');
</script>

<p class="font-bold">{data.name}</p>
<br />

<a
	href={resolve(`/${parentFolder}`)}
	class="flex border-t-2 border-t-black border-b-2 border-b-black items-center space-x-3"
>
	<img src="/up.svg" alt="up" class="w-7 h-7" />
	<p>Go up</p>
</a>

<div>
	{#each data.folderChildren as c (c.id)}
		<div class="flex border-t-2 border-t-black border-b-2 border-b-black items-center space-x-3">
			{#if c.isFolder}
				<img src="/folder.svg" alt="folder" class="w-7 h-7" />
			{:else}
				<img src="/file.svg" alt="file" class="w-7 h-7" />
			{/if}
			<a href={resolve(c.isFolder ? `/${c.id}` : `/${c.id}/view`)}>{c.name}</a>
			{#if !c.isFolder}
				<a
					href={resolve(`/download/${c.id}`)}
					class="p-1 bg-blue-600 hover:bg-blue-700 duration-300 m-1 rounded-xl cursor-pointer"
					>Download</a
				>
			{/if}
			<a
				href={resolve(`/${c.id}/delete`)}
				class="ml-auto p-1 bg-red-500 hover:bg-red-400 duration-300 m-1 rounded-xl cursor-pointer"
				>Delete</a
			>
		</div>
	{/each}
</div>
