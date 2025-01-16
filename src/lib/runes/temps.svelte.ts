// import {$}

// getter/setter Runes version
export class GetSetTemps {
	#c = $state(0);
	#f = $state(32);

	// NOTE pass-through works with reactivity !!
	get c() {
		return this.#c;
	}

	get f() {
		return this.#f;
	}

	// NOTE this is great, since *both* values are set without any (mutual) reference
	// NOTE we are not using $derived here, but a regular setter
	set c(c: number) {
		this.#c = c;
		this.#f = c * (9 / 5) + 32;
	}

	set f(f: number) {
		this.#f = f;
		this.#c = ((f - 32) * 5) / 9;
	}
}

// derived Runes version
export class DerivedTemps {
	c = $state(0);
	f = $state(32);
	f_derived = $derived((this.c * 9) / 5 + 32);
	c_derived = $derived(((this.f - 32) * 5) / 9);
}
