import { writable } from 'svelte/store';

/**
 * OLD STORE VERSION
 */
export function TempStore(initialValue: number) {
	const c = writable(initialValue);
	const f = writable(initialValue * (9 / 5) + 32);

	// intercept the update to c
	// TODO does below code mean that internally, f is updated before c?
	function updateC(updater: (c: number) => number) {
		c.update((newCVal) => {
			// ...in order to update f in the process
			f.set(newCVal * (9 / 5) + 32);
			// ...and then return the new c value
			return updater(newCVal);
		});
	}
	// intercept the update to f
	function updateF(updater: (f: number) => number) {
		f.update((newFVal) => {
			// ...in order to update c in the process
			c.set(newFVal - 32 * (5 / 9));
			// ...and then return the new f value
			return updater(newFVal);
		});
	}

	function setC(newCVal: number) {
		// this is where we define the updater function for the updateC function above
		updateC(() => newCVal);
	}

	function setF(newFVal: number) {
		// this is where we define the updater function for the updateF function above
		updateF(() => newFVal);
	}

	return {
		c,
		f,
		setC,
		setF
	};
}

/**
 * NEW RUNES VERSION - SETTER / GETTER
 */
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

/**
 * NEW RUNES VERSION - DERIVED "hook""
 */
export function TempsWithRunes(initialValue = 0) {
	let c = $state(initialValue);
	let f = $state((initialValue * 9) / 5 + 32);

	// NOTE we need to return getters & setters
	// NOTE since we are crossing the function boundary
	return {
		get c() {
			return c;
		},
		get f() {
			return f;
		},
		// NOTE doing this is setters enables 'bind:value' directive
		// NOTE instead of calling a 'setXy' function 'oninput={...}'
		set c(value: number) {
			c = value;
			f = (value * 9) / 5 + 32;
		},
		set f(value: number) {
			f = value;
			c = ((value - 32) * 5) / 9;
		}
	};
}
