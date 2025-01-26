type Circle = {
	id: string;
	cx: number;
	cy: number;
	r: number;
	fill: string;
};

export function useRuneCircles() {
	let circles = $state<Circle[]>([]);
	let snapshots: Circle[][] = [];
	// NOTE must be -1, because [0] will be the first snapshot added.
	// NOTE works with 0, if we push an empty object right at init...
	let history = $state<number>(-1);
	$inspect({ snapshots, history });

	type Status = 'drawing' | 'editing';
	let status = $state<Status>('drawing');

	let svg: SVGElement = null!;

	let selected: Circle = $state(null!);
	// $inspect({ selected });
	// NOTE compare circles at the end of an edit & only snapshot when they differ
	let backup: Circle = $state(null!);

	function drawCircle(e: MouseEvent) {
		// console.log('drawCircle', e);
		if (status !== 'drawing') {
			status = 'drawing';
			if (JSON.stringify(selected) !== JSON.stringify(backup)) {
				snapshot();
			}
			selected = null!;
			return;
		}
		if (selected) {
			return;
		}
		const { top, left } = svg.getBoundingClientRect();
		const newCircle: Circle = {
			id: window.crypto.randomUUID(),
			cx: +(e.clientX - left).toFixed(),
			cy: +(e.clientY - top).toFixed(),
			r: 20,
			fill: 'transparent'
		};
		circles = [...circles, newCircle];
		snapshot();
	}

	function snapshot() {
		if (history < snapshots.length) {
			snapshots = snapshots.slice(0, history + 1);
		}
		history++;
		snapshots.push($state.snapshot(circles));
	}

	function undo() {
		if (history < 0) {
			return;
		}
		circles = snapshots[--history];
	}

	function redo() {
		if (history >= snapshots.length - 1) {
			return;
		}
		circles = snapshots[++history];
	}

	return {
		get circles() {
			return circles;
		},
		get snapshots() {
			return snapshots;
		},
		get history() {
			return history;
		},
		get status() {
			return status;
		},
		set status(s: Status) {
			status = s;
		},
		get svg() {
			return svg;
		},
		set svg(s: SVGElement) {
			svg = s;
		},
		get selected() {
			return selected;
		},
		set selected(value: Circle) {
			selected = value;
		},
		get backup() {
			return backup;
		},
		set backup(value: Circle) {
			backup = value;
		},
		drawCircle,
		snapshot,
		undo,
		redo
	};
}
