<script lang="ts">
    import { currentUser } from "$lib/stores";
    let { username, status } = currentUser;
</script>

<div class="form-control w-fit">
    <label class="label">
        <span class="label-text">Username</span>
    </label>
    <input type="text" class="input input-bordered" bind:value={username} />
</div>

<div class="form-control w-fit">
    <label class="label">
        <span class="label-text">Status</span>
    </label>
    <input type="email" class="input input-bordered" bind:value={status} />
</div>