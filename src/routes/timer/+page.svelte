<script lang="ts">
	import { useInteractiveSlider } from '$lib/runes/slider.svelte';

	const slider = useInteractiveSlider();
</script>

<div class="page-content-wrap">
	<div class="flex flex-row gap-2 items-center">
		Progress:
		<progress class="block progress progress-success w-56" value={slider.progress} max="100"
		></progress>
	</div>

	<div>Elapsed Time: {slider.e}</div>

	<div class="flex flex-row gap-2 items-center">
		Duration:
		<input type="range" bind:value={slider.d} min="0" max="300" class="w-56" />
	</div>

	<div>Duration: {slider.d}</div>

	<button class="btn btn-warning mt-2 w-24" onclick={() => (slider.e = 0)}>Reset</button>
</div>
