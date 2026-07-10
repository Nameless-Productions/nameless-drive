<script lang="ts">
	import { page } from '$app/state';

	const errMsg = page.error?.message;
	const status = page.status;
</script>

<p class="text-xl font-bold">{status} - {errMsg}</p>
