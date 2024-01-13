<script lang="ts">
    export let data;
</script>

{#if data.users}
    {#each data.users as user}
        <a href={`/users/${user.tag}`} class="btn">{user.tag}</a>
    {/each}
{/if}