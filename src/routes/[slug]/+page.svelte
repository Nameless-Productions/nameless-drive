<script lang="ts">
    let {data} = $props()
</script>

<p class="font-bold">{data.name}</p>

<div>
    {#each data.folderChildren as c (c.id)}
        <div class="flex border-t-2 border-t-black border-b-2 border-b-black items-center">
            {#if c.isFolder}
                <img src="/folder.svg" alt="folder" class="w-7 h-7">
                {:else}
                <img src="/file.svg" alt="file" class="w-7 h-7">
            {/if}
            <p>{c.name}</p>
        </div>
    {/each}
</div>