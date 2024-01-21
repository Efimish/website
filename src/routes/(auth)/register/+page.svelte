<script lang="ts">
	import { register } from "$lib/api/auth";
	let username: string, email: string, password: string;
</script>

<div class="form-control w-full max-w-xs ml-2">
	<label class="label">
		<span class="label-text">Username (unique)</span>
	</label>
	<input type="text" placeholder="your_username" bind:value={username}
	class="input input-bordered w-full max-w-xs" />
</div>
<div class="form-control w-full max-w-xs ml-2">
	<label class="label">
		<span class="label-text">Email</span>
	</label>
	<input type="email" placeholder="admin@efima.fun" bind:value={email}
	class="input input-bordered w-full max-w-xs" />
</div>
<div class="form-control w-full max-w-xs ml-2">
	<label class="label">
		<span class="label-text">Password</span>
	</label>
	<input type="password" placeholder="*****" bind:value={password}
	class="input input-bordered w-full max-w-xs" />
</div>
<button class="btn" on:click={() => register(username, email, password)}>Register</button>