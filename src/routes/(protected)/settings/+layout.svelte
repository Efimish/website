<script lang="ts">
    import { page } from "$app/stores";
    $: path = $page.url.pathname;
</script>

<!-- <div class="join">
    <a href="/settings/account" class="join-item btn">Account settings</a>
    <a href="/settings/profile" class="join-item btn">Profile settings</a>
    <a href="/settings/appearence" class="join-item btn">Appearence settings</a>
    <a href="/settings/sessions" class="join-item btn">Active sessions</a>
</div> -->
<div class="tabs tabs-boxed">
    <a href="/settings/account" class="tab" class:tab-active={path === '/settings/account'}>Account settings</a>
    <a href="/settings/profile" class="tab" class:tab-active={path === '/settings/profile'}>Profile settings</a>
    <a href="/settings/appearence" class="tab" class:tab-active={path === '/settings/appearence'}>Appearence settings</a>
    <a href="/settings/sessions" class="tab" class:tab-active={path === '/settings/sessions'}>Active sessions</a>
</div>
<slot />