<script lang="ts">
    import { authenticated } from '$lib/stores';
    import { goto } from '$app/navigation';
    if (!$authenticated) goto('/login');
</script>
{#if $authenticated}
    <slot />
{/if}