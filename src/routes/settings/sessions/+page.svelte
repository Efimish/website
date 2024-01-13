<script lang="ts">
    import { goto } from '$app/navigation';
    import { axiosInstance } from '$lib/api/init';
    import { currentUser } from '$lib/stores';
    import { formatDate } from '$lib/utils/formatDate';
    // if (!$currentUser) return goto('/');
    const mySession = $currentUser.sessions.filter(s => s.session_id === $currentUser?.currentSession)[0];
    const otherSessions = $currentUser.sessions.filter(s => s.session_id !== $currentUser?.currentSession);
    const terminateSession = async (sessionId: string) => {
        await axiosInstance.post('/endSession', {
            sessionId
        });
    }
    const terminateOtherSessions = async () => {
        await axiosInstance.post('/endSession/all');
    }
</script>

<div class="overflow-x-auto">
    <table class="table table-zebra">
        <thead>
            <tr>
                <th></th>
                <th>IP</th>
                <th>LOCATION</th>
                <th>SYSTEM</th>
                <th>CREATED</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th><button class="btn btn-primary" on:click={() => terminateOtherSessions()}>Terminate all other</button></th>
                <th>{mySession.user_ip}</th>
                <th>{mySession.user_location}</th>
                <th>{mySession.user_agent}</th>
                <th>{formatDate(new Date(mySession?.created_at))}</th>
            </tr>
            {#each otherSessions as session}
                <tr>
                    <th><button class="btn btn-primary" on:click={() => terminateSession(session.session_id)}>Terminate</button></th>
                    <th>{session.user_ip}</th>
                    <th>{session.user_location}</th>
                    <th>{session.user_agent}</th>
                    <th>{formatDate(new Date(session.created_at))}</th>
                </tr>
            {/each}
        </tbody>
    </table>
</div>