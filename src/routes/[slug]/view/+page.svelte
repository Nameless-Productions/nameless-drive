<script lang="ts">
    let {data} = $props()
</script>

<p class="font-bold">{data.fileName}</p>
<br>

{#if data.type === "text"}
    <p style="white-space: pre-line;">{data.fileText}</p>
    {:else if data.type === "image"}
    <img src={`/download/${data.id}`} alt={data.fileName}>
    {:else if data.type === "video"}
    <video src={`/download/${data.id}`} controls>
        <track kind="captions"><track/>
    </video>
{/if}