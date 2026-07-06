<script lang="ts">
	import { resolve } from '$app/paths';

    let {data} = $props()

    function getUrl(isFolder: boolean, id: number) {
        if(isFolder) return `/${id}`;
        return `/download/${id}`
    }
</script>


<div>
    {#each data.stuff as c (c.id)}
        <a href={getUrl(c.isFolder, c.id)} class="flex border-t-2 border-t-black border-b-2 border-b-black items-center space-x-3">
            {#if c.isFolder}
                <img src="/folder.svg" alt="folder" class="w-7 h-7">
                {:else}
                <img src="/file.svg" alt="file" class="w-7 h-7">
            {/if}
            <p>{c.name}</p>
        </a>
    {/each}
</div>