<script lang="ts">
    let {data} = $props()
</script>

<p class="font-bold">{data.fileName}</p>
<br>
<p style="white-space: pre-line;">{data.fileText}</p>