<script lang="ts">
	import { useInteractiveSlider } from '$lib/runes/slider.svelte';
	import { onMount } from 'svelte';

	const slider = useInteractiveSlider();

	onMount(() => {
		slider.start();
	});
</script>

<div class="flex flex-row gap-2 items-center">
	Progress:
	<progress class="block progress progress-success w-56" value={slider.progress} max="100"
	></progress>
</div>
<div>Elapsed Time: {slider.e}</div>

<div class="flex flex-row gap-2 items-center">
	Duration:
	<input type="range" value={slider.d} oninput={slider.handleDC} min="0" max="300" class="w-56" />
</div>

<div>Duration: {slider.d}</div>

<button class="btn btn-warning" onclick={slider.handleReset}>Reset</button>
