<script lang="ts">
    let isDark = true;
</script>

<div class="form-control">
  <label class="label cursor-pointer max-w-fit">
    <span class="label-text">Light</span>
    <input type="checkbox" class="toggle" bind:checked={isDark} />
    <span class="label-text">Dark</span>
  </label>
</div>

<p>This switch does nothing (shhhh)</p>