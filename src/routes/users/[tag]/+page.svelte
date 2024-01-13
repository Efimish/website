<script lang="ts">
    import { formatDate } from '$lib/utils/formatDate.js';
    export let data;
</script>

{#if data.user}
    <h1 class="text-3xl">{data.user.username}'s Profile</h1>
    <span class="badge">@{data.user.tag}</span>
    <span class="badge">ID: {data.user.id}</span>
    <p>Status: {data.user.status}</p>
    <p>Member since: {formatDate(new Date(data.user.created_at))}</p>
{/if}