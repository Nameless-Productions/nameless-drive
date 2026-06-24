<script lang="ts">
	import { formStore } from '$lib/stores/formStore.svelte';

    let {form} = $props()
    formStore.data = form
</script>

<p>Hello world!</p>