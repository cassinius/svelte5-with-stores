<script lang="ts">
	import { StateGetSetTemps, DeriveEffectTemps } from '$lib/runes/temps.svelte';
	import { nano_c, nano_f, nano_inputs } from '$lib/nano/temps';

	const runeGetSetTemps = new StateGetSetTemps();
	const runeDeriveEffectTemps = new DeriveEffectTemps();

	/**
	 * RUNES EFFECTS
	 */
	// NOTE for 2-way binding on RUNES
	$effect(() => {
		const newFVal = (runeDeriveEffectTemps.c * 9) / 5 + 32;
		const newFLen = newFVal.toString().split('.')[1]?.length || 0;
		runeDeriveEffectTemps.f_input.value = newFLen > 4 ? newFVal.toFixed(4) : newFVal.toString();
	});
	// NOTE this effect must run separately from the above effect !!
	$effect(() => {
		const newCVal = ((runeDeriveEffectTemps.f - 32) * 5) / 9;
		const newCLen = newCVal.toString().split('.')[1]?.length || 0;
		runeDeriveEffectTemps.c_input.value = newCLen > 4 ? newCVal.toFixed(4) : newCVal.toString();
	});

	/**
	 * NANOSTORES EFFECTS
	 */
	$effect(() => {
		const newFVal = ($nano_c * 9) / 5 + 32;
		console.log('newFVal:', newFVal);
		const newFLen = newFVal.toString().split('.')[1]?.length || 0;
		nano_inputs.f.value = newFLen > 4 ? newFVal.toFixed(4) : newFVal.toString();
	});
	$effect(() => {
		const newCVal = ($nano_f - 32) * (5 / 9);
		console.log('newCVal:', newCVal);
		const newCLen = newCVal.toString().split('.')[1]?.length || 0;
		nano_inputs.c.value = newCLen > 4 ? newCVal.toFixed(4) : newCVal.toString();
	});
</script>

<h3>Runes $state + get/set: 2-way binding</h3>
<input type="number" bind:value={runeGetSetTemps.c} />
<span>C =</span>
<input type="number" bind:value={runeGetSetTemps.f} />
<span>F</span>
<!-- <br/><span>pub_f_no_getter: {getSetTemps.pubf}</span>
<br/><span>pub_f_no_$state: {getSetTemps.pubfnostate}</span> -->

<h3>Runes $state + $effect: 2-way binding</h3>
<input
	type="number"
	bind:this={runeDeriveEffectTemps.c_input}
	oninput={(e) => (runeDeriveEffectTemps.c = +e.currentTarget.value)}
/>
<span>C =</span>
<input
	type="number"
	bind:this={runeDeriveEffectTemps.f_input}
	oninput={(e) => (runeDeriveEffectTemps.f = +e.currentTarget.value)}
/>
<span>F</span>

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

<!-- <h3>Runes $derived: 1-way binding</h3>
<input type="number" bind:value={runeDeriveEffectTemps.c} />
<span>C =</span>
<span>{runeDeriveEffectTemps.f_derived} F</span>
<br />
<input type="number" bind:value={runeDeriveEffectTemps.f} />
<span>F =</span>
<span>{runeDeriveEffectTemps.c_derived} C</span> -->

<!-- <h3>NanoStores computed: 1-way</h3>
<input type="number" bind:value={$nano_c} />
<span>C =</span>
<span>{$nano_f_computed} F</span>
<br />
<input type="number" bind:value={$nano_f} />
<span>F =</span>
<span>{$nano_c_computed} C</span> -->
