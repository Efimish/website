<script lang="ts">
    import { authenticated } from '$lib/stores';
    import { goto } from '$app/navigation';
    if ($authenticated) goto('/');
</script>
{#if !$authenticated}
    <slot />
{/if}