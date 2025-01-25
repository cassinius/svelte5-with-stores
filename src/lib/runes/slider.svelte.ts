export function useInteractiveSlider(initialDuration = 100) {
	let e = $state(0);
	let d = $state(initialDuration);
	let progress = $derived(d > 0 ? (100 * e) / d : 100);
	let interval: number = null!;
	$inspect({ e, d });

	$effect(() => {
		if (e >= d) {
			clearInterval(interval);
			interval = null!;
		} else if (!interval) {
			interval = setInterval(() => e++, 100);
		}
	});

	return {
		get e() {
			return e;
		},
		set e(value: number) {
			e = value;
		},
		get d() {
			return d;
		},
		set d(value: number) {
			d = value;
		},
		get progress() {
			return progress;
		}
	};
}
