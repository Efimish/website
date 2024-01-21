<script lang="ts">
    import { getMySessions, endOneSession } from '$lib/api/sessions';
    import { formatDate } from '$lib/utils/formatDate';
</script>

{#await getMySessions() then sessions}
{#if sessions}
<div class="overflow-x-auto">
    <table class="table table-zebra">
        <thead>
            <tr>
                <th></th>
                <th>IP</th>
                <th>LOCATION</th>
                <th>SYSTEM</th>
                <th>ONLINE</th>
            </tr>
        </thead>
        <tbody>
            {#each sessions as session}
                <tr>
                    <th><button class="btn btn-primary" on:click={() => endOneSession(session.sessionId)}>Terminate</button></th>
                    <th>{session.userIp}</th>
                    <th>{session.userCountry}, {session.userCity}</th>
                    <th>{session.userAgent}</th>
                    <th>{formatDate(session.lastActive)}</th>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
{/if}
{/await}