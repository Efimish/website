<script lang="ts">
    import { getUsers } from '$lib/api/users';
</script>

<h1 class="text-3xl">Users</h1>
{#await getUsers() then users}
    {#if users}
        {#each users as user}
            <a href={`/users/${user.username}`} class="btn">{user.displayName}</a>
        {/each}
    {/if}
{/await}