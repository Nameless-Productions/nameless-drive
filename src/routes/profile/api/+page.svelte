<script>
	import { resolve } from '$app/paths';
</script>

<p class="font-bold text-xl">Manage API keys</p>
<br />

<a href={resolve('/profile/api/create')} class="link">Create API key</a>
<br />
<a href={resolve('/profile/api/delete')} class="link">Invalidate all API keys</a>
