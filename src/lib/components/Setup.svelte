<script lang="ts">
    import { formStore } from "$lib/stores/formStore.svelte";
</script>

<div class="text-neutral-300 m-2">
    <p class="font-bold text-xl">Setup Nameless Drive</p>
    <p class="text-sm text-neutral-500">This is the first time starting Nameless Drive so you have to create an account</p>
    <form action="?/account" method="POST">
        <input type="text" placeholder="Username" name="username" required class="mt-2">
        <br>
        <input type="password" placeholder="Password" name="password" required class="mt-2">
        <br>
        <input type="submit" value="Create account" required class="mt-2">
    </form>

    <br>

    {#if formStore.data?.error}
        <p class="mt-2 text-red-500">Error: {formStore.data.error}</p>
    {/if}
</div>