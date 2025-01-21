import { signal, computed, effect } from 'alien-signals';

let alienCount: any;

/**
 * would need to ge generic to be of any further use
 */
export function createSvelteAlienCounter(initialValue = -42) {
	alienCount = signal(initialValue);

	const set = (v: number) => alienCount(v);

	const subscribe = (fn: (v: number) => () => void) => {
		effect(() => fn(alienCount()));
		return () => null;
	};

	return {
		set,
		subscribe
	};
}

export function createSvelteAlienDouble() {
	let alienDouble = computed(() => alienCount() * 2);

	// poor man's readable !?
	const set = () => null;

	const subscribe = (fn: (v: number) => () => void) => {
		effect(() => fn(alienDouble()));
		return () => null;
	};

	return {
		set,
		subscribe
	};
}
