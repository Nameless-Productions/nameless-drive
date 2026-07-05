<script lang="ts">
    let dialog: HTMLDialogElement;
</script>

<button type="button" class="font-bold bg-neutral-900 p-2 rounded-xl cursor-pointer" onclick={() => dialog.showModal()}>Upload</button>

<dialog bind:this={dialog} class="bg-transparent text-neutral-300 m-auto backdrop:bg-neutral-950/70">

    <div class="relative flex flex-col gap-2 p-6 pt-10">
        <button type="button" onclick={() => dialog.close()} class="top-2 left-2 absolute w-7 h-7 flex hover:bg-neutral-700 rounded-xl p-1 items-center justify-center duration-300 cursor-pointer">X</button>

    <button type="button" class="p-2 rounded-xl bg-neutral-600 cursor-pointer hover:bg-neutral-700 duration-300">New folder</button>
    <br>
    <button type="button" class="p-2 rounded-xl bg-neutral-600 cursor-pointer hover:bg-neutral-700 duration-300">Upload file</button>
    </div>
</dialog>