<script lang="ts">
	import { GetSetTemps, DerivedTemps } from '$lib/runes/temps.svelte';

	const getSetTemps = new GetSetTemps();
	const derivedTemps = new DerivedTemps();
</script>

<h2>Svelte Runes</h2>

<h3>Getter/Setter - 2-way binding</h3>
<span>Celsius:</span>
<input type="number" bind:value={getSetTemps.c} />
<span>Fahrenheit:</span>
<input type="number" bind:value={getSetTemps.f} />
<!-- <br/><span>pub_f_no_getter: {getSetTemps.pubf}</span>
<br/><span>pub_f_no_$state: {getSetTemps.pubfnostate}</span> -->

<h3>Pure $derived - 1-way binding</h3>
<span>Celsius:</span>
<input type="number" bind:value={derivedTemps.c} />
<span>Fahrenheit: {derivedTemps.f_derived}</span>
<br />
<span>Fahrenheit:</span>
<input type="number" bind:value={derivedTemps.f} />
<span>Celsius: {derivedTemps.c_derived}</span>
