<script lang="ts">
	import { TempStore, StateGetSetTemps, TempsWithRunes } from '$lib/runes/temps.svelte';
	import { nano_c, nano_f, nano_inputs } from '$lib/nano/temps';

	const { c: cStore, f: fStore, setC, setF } = TempStore(0);
	const runeGetSetTemps = new StateGetSetTemps();
	const runesTemps = TempsWithRunes();

	/**
	 * NANOSTORES EFFECTS
	 */
	$effect(() => {
		const newFVal = ($nano_c * 9) / 5 + 32;
		const newFLen = newFVal.toString().split('.')[1]?.length || 0;
		nano_inputs.f.value = newFLen > 4 ? newFVal.toFixed(4) : newFVal.toString();
	});
	$effect(() => {
		const newCVal = ($nano_f - 32) * (5 / 9);
		const newCLen = newCVal.toString().split('.')[1]?.length || 0;
		nano_inputs.c.value = newCLen > 4 ? newCVal.toFixed(4) : newCVal.toString();
	});
</script>

<!-- SVELTE STORES -->
<h3>Svelte store: 2-way binding</h3>
<input type="number" bind:value={$cStore} oninput={(e) => setC(+e.currentTarget.value)} />
<span>C =</span>
<input type="number" bind:value={$fStore} oninput={(e) => setF(+e.currentTarget.value)} />
<span>F</span>

<!-- RUNES "GET/SET" -->
<h3>Runes $state + "class get/set": 2-way binding</h3>
<input type="number" bind:value={runeGetSetTemps.c} />
<span>C =</span>
<input type="number" bind:value={runeGetSetTemps.f} />
<span>F</span>

<!-- RUNES "FUNCTION" -->
<h3>Runes $state + "func get/set": 2-way binding</h3>
<input type="number" bind:value={runesTemps.c} />
<span>C =</span>
<input type="number" bind:value={runesTemps.f} />
<span>F</span>

<!-- NANOSTORES ATOM -->
<h3>Nanostores atom + $effect: 2-way binding</h3>
<input
	type="number"
	bind:this={nano_inputs.c}
	oninput={(e) => nano_c.set(+e.currentTarget.value)}
/>
<span>C =</span>
<input
	type="number"
	bind:this={nano_inputs.f}
	oninput={(e) => nano_f.set(+e.currentTarget.value)}
/>
<span>F</span>
