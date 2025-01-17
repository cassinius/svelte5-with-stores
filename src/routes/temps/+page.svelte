<script lang="ts">
	import { TempStore, StateGetSetTemps, useRuneTemps } from '$lib/runes/temps.svelte';
	import { useNanoTemps } from '$lib/nano/temps';

	const { c: cStore, f: fStore, setC: storeSetC, setF: storeSetF } = TempStore(0);
	const runeGetSetTemps = new StateGetSetTemps();
	const runesTemps = useRuneTemps();
	let { c: nanoC, f: nanoF, setC: nanoSetC, setF: nanoSetF } = useNanoTemps();
</script>

<!-- SVELTE STORES -->
<h3>Svelte store: 2-way binding</h3>
<input type="number" bind:value={$cStore} oninput={(e) => storeSetC(+e.currentTarget.value)} />
<span>C =</span>
<input type="number" bind:value={$fStore} oninput={(e) => storeSetF(+e.currentTarget.value)} />
<span>F</span>

<!-- RUNES "GET/SET" -->
<h3>Runes $state + "class get/set": 2-way binding</h3>
<input type="number" bind:value={runeGetSetTemps.c} />
<span>C =</span>
<input type="number" bind:value={runeGetSetTemps.f} />
<span>F</span>

<!-- RUNES "HOOKS" -->
<h3>Runes $state + "func get/set": 2-way binding</h3>
<input type="number" bind:value={runesTemps.c} />
<span>C =</span>
<input type="number" bind:value={runesTemps.f} />
<span>F</span>

<!-- NANOSTORES "HOOKS" -->
<h3>Nanostores atom + $effect: 2-way binding</h3>
<input type="number" value={$nanoC} oninput={(e) => nanoSetC(+e.currentTarget.value)} />
<span>C =</span>
<input type="number" value={$nanoF} oninput={(e) => nanoSetF(+e.currentTarget.value)} />
<span>F</span>
