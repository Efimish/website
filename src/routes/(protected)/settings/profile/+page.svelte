<script lang="ts">
    import { getMyUser } from "$lib/api/users";
    let username: string, email: string;
    import { editMyUser } from "$lib/api/users";
    let displayName: string, status: string;
</script>

{#await getMyUser() then user}
{#if user}
<div class="form-control w-fit">
    <label class="label">
        <span class="label-text">Display name</span>
    </label>
    <input type="text" class="input input-bordered" placeholder={user.displayName} bind:value={displayName} />
</div>

<div class="form-control w-fit">
    <label class="label">
        <span class="label-text">Status</span>
    </label>
    <input type="email" class="input input-bordered" placeholder={user.status} bind:value={status} />
</div>

<button class="btn" on:click={()=>editMyUser({displayName, status})}>Send</button>
{/if}
{/await}