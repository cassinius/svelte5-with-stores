export function createCounter(initialValue = 0) {
	let count = $state(initialValue);
	let double = $derived(count * 2);

	return {
		get count() {
			return count;
		},
		set count(v: number) {
			count = v;
		},
		get double() {
			return double;
		}
	};
}
