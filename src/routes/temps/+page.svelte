<script lang="ts">
	import { GetSetTemps, DerivedTemps } from '$lib/runes/temps.svelte';

	const getSetTemps = new GetSetTemps();
	const pureRunes = new DerivedTemps();
</script>

<h2>Svelte Runes</h2>

<h3>Getter/Setter - 2-way binding</h3>
<span>Celsius:</span>
<input type="number" bind:value={getSetTemps.c} />
<span>Fahrenheit:</span>
<input type="number" bind:value={getSetTemps.f} />

<h3>Pure $derived - 1-way binding</h3>
<span>Celsius:</span>
<input type="number" bind:value={pureRunes.c} />
<span>Fahrenheit: {pureRunes.f_derived}</span>
<br />
<span>Fahrenheit:</span>
<input type="number" bind:value={pureRunes.f} />
<span>Celsius: {pureRunes.c_derived}</span>
