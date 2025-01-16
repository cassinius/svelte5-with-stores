<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main class="m-2">
	{@render children()}
</main>
