<script lang="ts">
	import { resolve } from "$app/paths";
	import NewBtn from "./NewBtn.svelte";
</script>

<nav class="flex space-x-4 border-b-3 border-b-neutral-500 text-neutral-300 p-2 items-center">
    <p class="text-xl font-bold">Nameless Drive</p>

    <NewBtn />

    <a class="navBtn" href={resolve("/profile")}>Profile</a>
</nav>