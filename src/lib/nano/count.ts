import { atom, computed } from 'nanostores';

export function createCounter(initialValue = 0) {
	let count = atom(initialValue);
	let double = computed(count, (v) => 2 * v);

	return {
		count,
		double,
		setCount(v: number) {
			// console.log('setting nano count to', v);
			count.set(v);
		}
	};
}
