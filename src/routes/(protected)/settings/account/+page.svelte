<script lang="ts">
    import { getMyUser } from "$lib/api/users";
    let username: string, email: string, password: string;
    import { editMyUser } from "$lib/api/users";
</script>

{#await getMyUser() then user}
{#if user}
<div class="form-control w-fit">
    <label class="label">
        <span class="label-text">Username (must be unique)</span>
    </label>
    <input type="text" class="input input-bordered" placeholder={user.username} bind:value={username} />
</div>

<div class="form-control w-fit">
    <label class="label">
        <span class="label-text">Email (must be unique)</span>
    </label>
    <input type="email" class="input input-bordered" placeholder={user.email} bind:value={email} />
</div>

<div class="form-control w-fit">
    <label class="label">
        <span class="label-text">Password</span>
    </label>
    <input type="password" class="input input-bordered" placeholder="*****" bind:value={password} />
</div>

<button class="btn" on:click={()=>editMyUser({username, email, password})}>Send</button>
{/if}
{/await}