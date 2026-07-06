<script lang="ts">
    let uploadDialog: HTMLDialogElement;
    let folderDialog: HTMLDialogElement;
    let fileDialog: HTMLDialogElement;
</script>

<button type="button" class="font-bold bg-neutral-900 p-2 rounded-xl cursor-pointer" onclick={() => uploadDialog.showModal()}>Upload</button>

<dialog bind:this={uploadDialog} class="bg-transparent text-neutral-300 m-auto backdrop:bg-neutral-950/70">

    <div class="relative flex flex-col gap-2 p-6 pt-10 bg-neutral-900 rounded-xl">
        <button type="button" onclick={() => uploadDialog.close()} class="top-2 left-2 absolute w-7 h-7 flex hover:bg-neutral-700 rounded-xl p-1 items-center justify-center duration-300 cursor-pointer">X</button>

    <button type="button" onclick={() => {folderDialog.showModal(); uploadDialog.close()}} class="p-2 rounded-xl bg-neutral-600 cursor-pointer hover:bg-neutral-700 duration-300">New folder</button>
    <br>
    <button type="button" onclick={() => {fileDialog.showModal(); uploadDialog.close()}} class="p-2 rounded-xl bg-neutral-600 cursor-pointer hover:bg-neutral-700 duration-300">Upload file</button>
    </div>
</dialog>

<dialog bind:this={folderDialog} class="bg-transparent text-neutral-300 m-auto backdrop:bg-neutral-950/70">

    <div class="relative flex flex-col gap-2 p-6 pt-10 bg-neutral-900 rounded-xl">
        <button type="button" onclick={() => folderDialog.close()} class="top-2 left-2 absolute w-7 h-7 flex hover:bg-neutral-700 rounded-xl p-1 items-center justify-center duration-300 cursor-pointer">X</button>

        <form action="?/folder" method="POST">
            <input type="text" name="name" placeholder="Folder Name" required>
            <br>
            <input type="submit" class="mt-3" value="Create">
        </form>
    </div>
</dialog>

<dialog bind:this={fileDialog} class="bg-transparent text-neutral-300 m-auto backdrop:bg-neutral-950/70">

    <div class="relative flex flex-col gap-2 p-6 pt-10 bg-neutral-900 rounded-xl">
        <button type="button" onclick={() => fileDialog.close()} class="top-2 left-2 absolute w-7 h-7 flex hover:bg-neutral-700 rounded-xl p-1 items-center justify-center duration-300 cursor-pointer">X</button>

        <form action="?/file" method="POST">
            <input type="file" required>
            <br>
            <input type="submit" class="mt-3" value="Upload">
        </form>
    </div>
</dialog>