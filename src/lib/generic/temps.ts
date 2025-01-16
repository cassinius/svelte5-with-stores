// getter/setter version
// does not need Runes at all !?
export class GetSetTemps {
	// NOTE these can be private or public, the reason #c is private here is solely so that we can mask it with the public getter/setter
	// #c = $state(0);
	// pubfnogetter = $state(32);
	// TODO why is this updating without $state ?
	// pubfnostate = 32;
	// TODO so in the end, we can just do this !?
	#c = 0;
	#f = 32;

	get c() {
		return this.#c;
	}

	get f() {
		return this.#f;
	}

	set c(c: number) {
		this.#c = c;
		this.#f = c * (9 / 5) + 32;
		// this.pubfnogetter = this.#f;
		// this.pubfnostate = this.#f;
	}

	set f(f: number) {
		this.#f = f;
		// this.pubfnogetter = this.#f;
		// this.pubfnostate = this.#f;
		this.#c = ((f - 32) * 5) / 9;
	}
}