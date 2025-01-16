<script lang="ts">
	import { StateGetSetTemps, DeriveEffectTemps } from '$lib/runes/temps.svelte';
	import { nano_c, nano_f, nano_c_computed, nano_f_computed } from '$lib/nano/temps';

	const getSetTemps = new StateGetSetTemps();
	const runeTemps = new DeriveEffectTemps();

	// NOTE for 2-way binding on Runes
	$effect(() => {
		const newFVal = (runeTemps.c * 9) / 5 + 32;
		const newFLen = newFVal.toString().split('.')[1]?.length || 0;
		runeTemps.f_input.value = newFLen > 4 ? newFVal.toFixed(4) : newFVal.toString();
	});

	// NOTE this effect must run separately from the above effect !!
	$effect(() => {
		const newC = ((runeTemps.f - 32) * 5) / 9;
		const newCLen = newC.toString().split('.')[1]?.length || 0;
		runeTemps.c_input.value = newCLen > 4 ? newC.toFixed(4) : newC.toString();
	});
</script>

<h3>Getter/Setter - 2-way binding</h3>
<input type="number" bind:value={getSetTemps.c} />
<span>C =</span>
<input type="number" bind:value={getSetTemps.f} />
<span>F</span>
<!-- <br/><span>pub_f_no_getter: {getSetTemps.pubf}</span>
<br/><span>pub_f_no_$state: {getSetTemps.pubfnostate}</span> -->

<h3>Runes $state + $effect - 2-way binding</h3>
<input
	type="number"
	bind:this={runeTemps.c_input}
	onkeyup={(e) => (runeTemps.c = +e.currentTarget.value)}
/>
<span>C =</span>
<input
	type="number"
	bind:this={runeTemps.f_input}
	onkeyup={(e) => (runeTemps.f = +e.currentTarget.value)}
/>
<span>F</span>

<h3>Runes $derived - 1-way binding</h3>
<input type="number" bind:value={runeTemps.c} />
<span>C =</span>
<span>{runeTemps.f_derived} F</span>
<br />
<input type="number" bind:value={runeTemps.f} />
<span>F =</span>
<span>{runeTemps.c_derived} C</span>

<h3>NanoStores - computed - 1-way</h3>
<input type="number" bind:value={$nano_c} />
<span>C =</span>
<span>{$nano_f_computed} F</span>
<br />
<input type="number" bind:value={$nano_f} />
<span>F =</span>
<span>{$nano_c_computed} C</span>
