<script lang="ts">
    import { page } from '$app/stores';
    const chatId: string = $page.params.chatId;
    import { getChat, getChatMessages, sendChatMessage } from '$lib/api/chats';
    import { getUser, getMyUser } from '$lib/api/users';
    import { formatDate } from '$lib/utils/formatDate';
    let context: string;
</script>

{#await getMyUser() then myUser}
{#if myUser}
{#await getChat(chatId) then chat}
{#if chat}
{#await getChatMessages(chatId) then messages}
{#if messages}
    <h1 class="text-3xl">{chat.chatName} (chat)</h1>
    <span class="badge">ID: {chat.chatId}</span>
    <div class="overflow-y-scroll flex flex-col w-96 h-96">
        {#each messages as message}
            {#await getUser(message.senderId) then user}
            {#if user}
                {#if user.userId === myUser.userId}
                    <div class="chat chat-end">
                        <div class="chat-header">
                            {user.displayName}
                            <time class="text-xs opacity-50">{formatDate(message.createdAt)}</time>
                        </div>
                        <div class="chat-bubble">{message.context}</div>
                    </div>
                {:else}
                    <div class="chat chat-start">
                        <div class="chat-header">
                            {user.displayName}
                            <time class="text-xs opacity-50">{formatDate(message.createdAt)}</time>
                        </div>
                        <div class="chat-bubble">{message.context}</div>
                    </div>
                {/if}
            {/if}
            {/await}
        {/each}
    </div>
    <div class="form-control w-fit">
        <label class="label">
            <span class="label-text">Type a new message</span>
        </label>
        <input type="text" class="input input-bordered" bind:value={context} />
    </div>
    <button class="btn" on:click={()=>sendChatMessage(chatId, context)}>Send message</button>
    <button class="btn" on:click={()=>window.location.reload()}>Reload chat</button>
{/if}
{/await}
{/if}
{/await}
{/if}
{/await}