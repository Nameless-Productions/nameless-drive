<script lang="ts">
    let {form} = $props()
</script>

<p class="font-bold text-xl">Log in</p>

<form action="?/login" method="POST">
    <input type="text" placeholder="Username" name="username" required class="mt-2">
    <br>
    <input type="password" placeholder="Password" name="password" required class="mt-2">
    <br>
    <input type="submit" value="Log in" class="mt-2">
</form>

{#if form?.error}
    <p class="mt-2 text-red-500">{form.error}</p>
{/if}