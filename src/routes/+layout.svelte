<script lang="ts">
  import "../app.css";
  import { authenticated } from "$lib/stores";
  import { getMyUser } from "$lib/api/users";
  import { logout } from "$lib/api/auth";
  let search: string;
</script>

<header class="navbar gap-2 border-b-2 border-base-200">
  <a href="/" class="btn" role="button">H</a>
  <div class="dropdown dropdown-hover">
    <label tabindex="0" class="btn btn-ghost btn-circle">
      <div class="w-10 h-10 bg-slate-700 rounded-full" />
    </label>
    <ul tabindex="0" class="dropdown-content menu mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border-2 border-base-200">
      <li><a href="/">Home</a></li>
      {#if !$authenticated}
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
      {:else}
        <li><a href="/users">Users</a></li>
        <li><a href="/chats">Chats</a></li>
      {/if}
    </ul>
  </div>
  <!-- <a href="/" class="btn btn-primary normal-case text-xl">Home</a>
  <a href="/login" class="btn btn-primary normal-case text-xl">Login</a> -->
  <div class="join flex-1 items-center">
    <!-- <button class="btn join-item">X</button>
    <svg xmlns="http://www.w3.org/2000/svg" height="2rem" width="2rem" viewBox="0 0 512 512" class="join-item">
      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
    </svg> -->
    <!-- <input bind:value={search} type="text" placeholder="Search" class="input input-bordered join-item flex-1"/> -->
    <!-- {#if !search || search.length === 0}
      <kbd class="kbd">/</kbd>
    {/if} -->
    <!-- {#if search && search.length > 0}
      <button on:click={() => search=""} class="btn join-item">X</button>
    {/if} -->
  </div>
  
  {#if $authenticated}
    {#await getMyUser() then user}
      <div>{user?.displayName}</div>
    {/await}
  {/if}

  <div class="dropdown dropdown-hover dropdown-end">
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label tabindex="0" class="btn btn-ghost btn-circle">
      <div class="w-10 h-10 bg-green-400 rounded-full"></div>
    </label>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    {#if $authenticated}
      {#await getMyUser() then user}
        <ul tabindex="0" class="dropdown-content menu mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border-2 border-base-200">
          <li><a href={`/users/${user?.username}`}>Profile</a></li>
          <li><a href={`/settings/account`}>Settings</a></li>
          <!-- <li><a href="/login">Logout</a></li> -->
          <li></li> 
          <li class="text-red-600"><button on:click={() => logout()}>Logout</button></li>
        </ul>
      {/await}
    {/if}
  </div>
</header>

<slot />