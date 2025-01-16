// derived Runes version
export class RuneTemps {
	c = $state(0);
	f = $state(32);
	f_derived = $derived((this.c * 9) / 5 + 32);
	c_derived = $derived(((this.f - 32) * 5) / 9);
}
