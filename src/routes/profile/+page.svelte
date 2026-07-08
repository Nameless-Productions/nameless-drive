<script lang="ts">
	import { resolve } from '$app/paths';

  
    let {data} = $props();
</script>

<p class="font-bold text-xl">Hello, {data.user?.username}!</p>
<br>

<ul class="list-disc list-inside ml-3">
    <li><a class="link" href={resolve("/profile/api")}>Manage API keys</a></li>
    <li><a class="link" href={resolve("/profile/logout")}>Log out</a></li>
</ul>