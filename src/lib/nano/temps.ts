import { atom, computed } from 'nanostores';

export const nano_c = atom(0);
export const nano_f = atom(32);
export const nano_f_computed = computed(nano_c, (c) => (c * 9) / 5 + 32);
export const nano_c_computed = computed(nano_f, (f) => ((f - 32) * 5) / 9);
