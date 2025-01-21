<script lang="ts">
	import { createCounter as createRunesCounter } from '$lib/runes/count.svelte';
	import { createCounter as createNanoCounter } from '$lib/nano/count';

	const runesCounter = createRunesCounter(-42);
	let { count: nanoCount, double: nanoDouble, setCount } = createNanoCounter(-42);
</script>

<h3>Runes counter</h3>
<p>
	Count: {runesCounter.count}
	<button
		class="p-1 rounded-md hover:cursor-pointer border-t-neutral-400 bg-slate-300"
		onclick={() => runesCounter.count++}>+</button
	>
	<button
		class="p-1 rounded-md hover:cursor-pointer border-t-neutral-400 bg-slate-300"
		onclick={() => runesCounter.count--}>-</button
	>
</p>
<p>Double: {runesCounter.double}</p>

<h3>Nano counter</h3>
<p>
	Count: {$nanoCount}
	<button
		class="p-1 rounded-md hover:cursor-pointer border-t-neutral-400 bg-slate-300"
		onclick={() => setCount($nanoCount + 1)}>+</button
	>
  <button
		class="p-1 rounded-md hover:cursor-pointer border-t-neutral-400 bg-slate-300"
		onclick={() => setCount($nanoCount - 1)}>-</button
	>
</p>
<p>Double: {$nanoDouble}</p>
