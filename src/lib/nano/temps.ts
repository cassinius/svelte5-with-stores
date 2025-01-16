import { atom, computed, type ReadableAtom } from 'nanostores';

export const nano_c = atom(0);
export const nano_f = atom(32);
// export const nano_f_computed = computed(nano_c, (c) => (c * 9) / 5 + 32);
// export const nano_c_computed = computed(nano_f, (f) => ((f - 32) * 5) / 9);

export const nano_inputs = {
	c: null as unknown as HTMLInputElement,
	f: null as unknown as HTMLInputElement
};

// TODO figure out how to make this map work in conjunction with atom/computed
// export interface ComputedEffectTemps {
//   c: number;
//   f: number;
//   f_derived: ReadableAtom<number>;
//   c_derived: number;
//   c_input: HTMLInputElement;
//   f_input: HTMLInputElement;
// }

// export const nano_temps = atom<ComputedEffectTemps>({
//   c: 0,
//   f: 32,
//   f_derived: computed(nano_temps, (nt) => (nt.c * 9) / 5 + 32),
//   c_derived: 0,
//   c_input: null as unknown as HTMLInputElement,
//   f_input: null as unknown as HTMLInputElement,
// });
