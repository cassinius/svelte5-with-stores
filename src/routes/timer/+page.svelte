<script lang="ts">
	let e = $state(0);
	let d = $state(100);
	let progress = $derived(d > 0 ? (100 * e) / d : 0);
	let timeout: number;
	// $inspect(progress, 'progress');

	// TODO: is this automatically batched? since it seems to 'block' while we slide the range...
	$effect(() => {
		if (e >= d) {
			return;
		} else {
			timeout = setTimeout(() => e++, 100);
		}
	});

	function handleDC(ev: Event) {
		ev.preventDefault();
		clearTimeout(timeout);
		d = parseInt((ev.currentTarget as HTMLInputElement).value);
	}

	function handleReset(ev: Event) {
		ev.preventDefault();
		clearTimeout(timeout);
		e = 0;
	}
</script>

<div class="flex flex-row gap-2 items-center">
	Progress:
	<progress class="block progress progress-primary w-56" value={progress} max="100"></progress>
</div>
<div>Elapsed Time: {e}</div>

<div class="flex flex-row gap-2 items-center">
	Duration:
	<input type="range" value={d} oninput={handleDC} min="0" max="1000" class="w-56" />
</div>

<div>Duration: {d}</div>

<button class="btn btn-primary" onclick={handleReset}>Reset</button>
