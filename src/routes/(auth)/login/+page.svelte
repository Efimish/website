<script lang="ts">
	import { login } from "$lib/api/auth";
	let tag: string, password: string;
</script>

<div class="form-control w-full max-w-xs ml-2">
	<label class="label">
		<span class="label-text">User Tag</span>
	</label>
	<input type="text" placeholder="admin" bind:value={tag}
	class="input input-bordered w-full max-w-xs" />
</div>
<div class="form-control w-full max-w-xs ml-2">
	<label class="label">
		<span class="label-text">Password</span>
	</label>
	<input type="password" placeholder="*****" bind:value={password}
	class="input input-bordered w-full max-w-xs" />
</div>
<button class="btn" on:click={() => login(tag, password)}>Log in</button>