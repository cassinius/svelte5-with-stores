<script lang="ts">
	import { GetSetTemps } from '$lib/generic/temps';
	import { RuneTemps } from '$lib/runes/temps.svelte';
	import { nano_c, nano_f, nano_c_computed, nano_f_computed } from '$lib/nano/temps';

	const getSetTemps = new GetSetTemps();
	const runeTemps = new RuneTemps();
</script>

<h3>Getter/Setter - 2-way binding</h3>
<input type="number" bind:value={getSetTemps.c} />
<span>Celsius =</span>
<input type="number" bind:value={getSetTemps.f} />
<span>Fahrenheit</span>
<!-- <br/><span>pub_f_no_getter: {getSetTemps.pubf}</span>
<br/><span>pub_f_no_$state: {getSetTemps.pubfnostate}</span> -->

<h3>Svelte $derived - 1-way binding</h3>
<input type="number" bind:value={runeTemps.c} />
<span>Celsius =</span>
<span>{runeTemps.f_derived} Fahrenheit</span>
<br />
<input type="number" bind:value={runeTemps.f} />
<span>Fahrenheit =</span>
<span>{runeTemps.c_derived} Celsius</span>

<h3>NanoStores Derived</h3>
<input type="number" bind:value={$nano_c} />
<span>Celsius =</span>
<span>{$nano_f_computed} Fahrenheit</span>
<br />
<input type="number" bind:value={$nano_f} />
<span>Fahrenheit =</span>
<span>{$nano_c_computed} Celsius</span>
