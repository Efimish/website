<script lang="ts">
    import { page } from '$app/stores';
    const username: string = $page.params.username;
    import { getUserByUsername } from '$lib/api/users';
    import { formatDate } from '$lib/utils/formatDate';
</script>

{#await getUserByUsername(username) then user}
{#if user}
    <h1 class="text-3xl">{user.displayName}'s Profile</h1>
    <span class="badge">@{user.username}</span>
    <span class="badge">ID: {user.userId}</span>
    <p>Status: {user.status}</p>
    <p>Online: {formatDate(user.online)}</p>
{/if}
{/await}