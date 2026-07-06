<script lang="ts">
	import { resolve } from '$app/paths';
	import { redirect } from '@sveltejs/kit';

    let {data} = $props()

    let parentFolder = $derived(data.parent ?? "")

    function getUrl(isFolder: boolean, id: number) {
        if(isFolder) return `/${id}`;
        return `/download/${id}`
    }
</script>

<p class="font-bold">{data.name}</p>
<br>

<a href={resolve(`/${parentFolder}`)} class="flex border-t-2 border-t-black border-b-2 border-b-black items-center space-x-3">
    <img src="/up.svg" alt="up" class="w-7 h-7">
    <p>Go up</p>
</a>

<div>
    {#each data.folderChildren as c (c.id)}
        <div class="flex border-t-2 border-t-black border-b-2 border-b-black items-center space-x-3">
            {#if c.isFolder}
                <img src="/folder.svg" alt="folder" class="w-7 h-7">
                {:else}
                <img src="/file.svg" alt="file" class="w-7 h-7">
            {/if}
            <a href={getUrl(c.isFolder, c.id)}>{c.name}</a>
            <a href={resolve(`/${c.id}/delete`)} class="ml-auto p-1 bg-red-500 hover:bg-red-400 duration-300 m-1 rounded-xl cursor-pointer">Delete</a>
        </div>
    {/each}
</div>