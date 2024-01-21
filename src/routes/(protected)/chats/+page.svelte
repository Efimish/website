<script lang="ts">
    import { getChats, createChat } from '$lib/api/chats';
    let chatName: string;
</script>

<h1 class="text-3xl">My chats</h1>
{#await getChats() then chats}
    {#if chats}
        {#each chats as chat}
            <a href={`/chats/${chat.chatId}`} class="btn">{chat.chatName}</a>
        {/each}
    {/if}
{/await}
<h1 class="text-2xl">Create new chat:</h1>
<div class="form-control w-fit">
    <label class="label">
        <span class="label-text">Chat name</span>
    </label>
    <input type="email" class="input input-bordered" bind:value={chatName} />
</div>
<button class="btn" on:click={()=>createChat(chatName)}>Create</button>