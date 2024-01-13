<!-- <p class="text-green-300 text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo odit neque quibusdam at ipsam, nesciunt rerum voluptate expedita. Modi molestias libero labore architecto! Modi quisquam iste totam perferendis quidem ipsa!</p>

<div class="collapse bg-base-200">
    <input type="checkbox" />
    <div class="collapse-title">Title</div>
    <div class="collapse-content">Hidden</div>
</div> -->

<script lang="ts">
    import { formatDate } from "$lib/utils/formatDate";
    let time = new Date();
    setInterval(() => {
        time = new Date();
    }, 1000);
</script>

<svelte:head>
    <title>Efima's Site</title>
    <meta property="og:type" content="website" />
    <meta property="og:url" content="http://efima.fun/" />
    <meta property="og:title" content="Efima's site" />
    <meta property="og:description" content="Website is under heavy development, do not expect it to work" />
    <meta property="og:image" content="https://a.storyblok.com/f/88751/1702x2049/619c584101/svelte_logo.png" />
    <meta name="theme-color" content="#588157" />
</svelte:head>

<p class="text-2xl">⌛ Right now it is ⌛</p>
<p class="text-5xl">{formatDate(time)}</p>