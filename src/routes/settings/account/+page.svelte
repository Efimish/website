<script lang="ts">
    import { currentUser } from "$lib/stores";
    let { tag, email } = currentUser;
</script>

<div class="form-control w-fit">
    <label class="label">
        <span class="label-text">Tag (must be unique)</span>
    </label>
    <input type="text" class="input input-bordered" bind:value={tag} />
</div>

<div class="form-control w-fit">
    <label class="label">
        <span class="label-text">Email</span>
    </label>
    <input type="email" class="input input-bordered" bind:value={email} />
</div>