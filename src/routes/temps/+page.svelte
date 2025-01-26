<script lang="ts">
	import { TempStore, StateGetSetTemps, useRuneTemps } from '$lib/runes/temps.svelte';
	import { useNanoTemps } from '$lib/nano/temps';

	const { c: cStore, f: fStore, setC: storeSetC, setF: storeSetF } = TempStore(0);
	const getSetTemps = new StateGetSetTemps();
	const runesTemps = useRuneTemps();
	let { c: nanoC, f: nanoF, setC: nanoSetC, setF: nanoSetF } = useNanoTemps();
</script>

<div class="page-content-wrap">
	<!-- SVELTE STORES -->
	<div>
		<h3>Svelte store</h3>
		<input type="number" value={$cStore} oninput={(e) => storeSetC(+e.currentTarget.value)} />
		<span>C =</span>
		<input type="number" value={$fStore} oninput={(e) => storeSetF(+e.currentTarget.value)} />
		<span>F</span>
	</div>

	<div>
		<!-- RUNES "GET/SET" -->
		<h3>Runes $state + "class get/set"</h3>
		<input type="number" bind:value={getSetTemps.c} />
		<span>C =</span>
		<input type="number" bind:value={getSetTemps.f} />
		<span>F</span>
	</div>

	<div>
		<!-- RUNES "HOOKS" -->
		<h3>Runes $state + "func get/set"</h3>
		<input type="number" bind:value={runesTemps.c} />
		<span>C =</span>
		<input type="number" bind:value={runesTemps.f} />
		<span>F</span>
	</div>

	<div>
		<!-- NANOSTORES "HOOKS" -->
		<h3>Nanostores atom + $effect</h3>
		<input type="number" value={$nanoC} oninput={(e) => nanoSetC(+e.currentTarget.value)} />
		<span>C =</span>
		<input type="number" value={$nanoF} oninput={(e) => nanoSetF(+e.currentTarget.value)} />
		<span>F</span>
	</div>
</div>
