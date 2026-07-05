<script lang="ts">
	import { resolve } from "$app/paths";

    const linkClass = "text-lg hover:font-bold duration-300"
</script>

<nav class="flex space-x-4 border-b-3 border-b-neutral-500 text-neutral-300 p-2 items-center">
    <p class="text-xl font-bold">Nameless Drive</p>

    <a href={resolve("/")} class={linkClass}>Home</a>
</nav>