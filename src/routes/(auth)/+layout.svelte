<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { currentUser } from '$lib/stores';
    onMount(() => {
        if ($currentUser) goto('/');
    });
</script>
<slot />