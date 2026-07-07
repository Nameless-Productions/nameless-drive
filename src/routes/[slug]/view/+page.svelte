<script lang="ts">
    let {data} = $props()
</script>

<p class="font-bold">{data.fileName}</p>
<br>

{#if data.type === "text"}
    <p style="white-space: pre-line;">{data.fileText}</p>
    {:else}
    <img src={`/download/${data.id}`} alt="image">
{/if}