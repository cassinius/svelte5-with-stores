import { atom } from 'xoid';

export const _xoid_c = atom(0, (a) => {
	compute: (f: number) => (a.value = ((f - 32) * 5) / 9);
});
export const _xoid_f = atom(32, (a) => {
	compute: (c: number) => (a.value = (c * 9) / 5 + 32);
});
