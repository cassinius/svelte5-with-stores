export function useInteractiveSlider(initialDuration = 100) {
	let e = $state(0);
	let d = $state(initialDuration);
	let progress = $derived(d > 0 ? (100 * e) / d : 100);
	let interval: number = null!;
	$inspect({ e, d });

	$effect(() => {
		if (e >= d) {
			clearAndDeleteInterval();
		}
	});

	// TODO: is this automatically batched? since it seems to 'block' while we slide the range...
	// NOTE: NO, but we are clearing the timeout manually on every value change...
	// $effect(() => {
	// 	if (e >= d) {
	// 		return;
	// 	} else {
	// 		timeout = setTimeout(() => e++, 100);
	// 	}
	// });

	const incrementFunc = () => e++;

	const clearAndDeleteInterval = () => {
		clearInterval(interval);
		interval = null!;
	};

	function handleDC(ev: Event) {
		ev.preventDefault();
		d = parseInt((ev.currentTarget as HTMLInputElement).value);
		if (e < d && !interval) {
			interval = setInterval(incrementFunc, 100);
		}
	}

	function handleReset(ev: Event) {
		ev.preventDefault();
		e = 0;
		if (!interval) {
			interval = setInterval(incrementFunc, 100);
		}
	}

	const start = () => {
		interval = setInterval(incrementFunc, 100);
	};

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
		},
		handleDC,
		handleReset,
		start
	};
}
