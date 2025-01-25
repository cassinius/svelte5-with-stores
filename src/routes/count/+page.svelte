<script lang="ts">
	import { createCounter as createRunesCounter } from '$lib/runes/count.svelte';
	import { createCounter as createNanoCounter } from '$lib/nano/count';
	import { createSvelteAlienCounter, createSvelteAlienDouble } from '$lib/alien/count';

	const runesCounter = createRunesCounter(-42);
	let { count: nanoCount, double: nanoDouble, setCount } = createNanoCounter(-42);
	let alienCount = createSvelteAlienCounter(-42);
	// TODO this is totally undescriptive of the inner logic in alien-signals...
	let alienDouble = createSvelteAlienDouble();
</script>

<h3>Runes counter</h3>
<p>
	Count: {runesCounter.count}
	<button class="btn btn-success btn-sm" onclick={() => runesCounter.count++}>+</button>
	<button class="btn btn-error btn-sm" onclick={() => runesCounter.count--}>-</button>
</p>
<p>Double: {runesCounter.double}</p>

<h3>Nano counter</h3>
<p>
	Count: {$nanoCount}
	<button class="btn btn-success btn-sm" onclick={() => setCount($nanoCount + 1)}>+</button>
	<button class="btn btn-error btn-sm" onclick={() => setCount($nanoCount - 1)}>-</button>
</p>
<p>Double: {$nanoDouble}</p>

<!-- TODO apparently, the call to alien() does not trigger the Svelte compiler to re-render -->
<h3>Alien counter</h3>
<p>
	Count: {$alienCount}
	<button class="btn btn-success btn-sm" onclick={() => $alienCount++}>+</button>
	<button class="btn btn-error btn-sm" onclick={() => $alienCount--}>-</button>
</p>
<p>Double: {$alienDouble}</p>
