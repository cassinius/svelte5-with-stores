import { atom } from 'nanostores';

export function useNanoTemps(initialValue = 0) {
	let c = atom(initialValue);
	let f = atom((initialValue * 9) / 5 + 32);

	return {
		// NOTE need to be destructured for $autosubscribe
		c,
		f,
		// NOTE cannot be setters for naming conflict
		setC(value: number) {
			c.set(value);
			f.set((value * 9) / 5 + 32);
			// console.log('set f in setC', f.value);
		},
		setF(value: number) {
			f.set(value);
			c.set(((value - 32) * 5) / 9);
			// console.log('set c in setF', c.value);
		}
	};
}
