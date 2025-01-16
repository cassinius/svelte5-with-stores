export class StateGetSetTemps {
	// NOTE these can be private or public, the reason #c is private here is solely so that we can mask it with the public getter/setter
	// NOTE the $state is necessary for Svelte to know that the getter must be re-run on $state change,
	// NOTE however, for some (caching?) reason, removal of $state might not immediately break the behavior...
	#c = $state(0);
	#f = $state(32);

	get c() {
		return this.#c;
	}

	get f() {
		return this.#f;
	}

	set c(c: number) {
		this.#c = c;
		this.#f = c * (9 / 5) + 32;
	}

	set f(f: number) {
		this.#f = f;
		this.#c = ((f - 32) * 5) / 9;
	}
}

export class DeriveEffectTemps {
	c = $state(0);
	f = $state(32);
	f_derived = $derived((this.c * 9) / 5 + 32);
	c_derived = $derived(((this.f - 32) * 5) / 9);
	// NOTE for 2-way binding on Runes
	// NOTE the $effects belonging to this must still run separately.
	c_input: HTMLInputElement = null as unknown as HTMLInputElement;
	f_input: HTMLInputElement = null as unknown as HTMLInputElement;
}
