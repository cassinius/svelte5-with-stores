<script lang="ts">
	type Circle = {
		id: string;
		cx: number;
		cy: number;
		r: number;
		fill: string;
	};
	let circles = $state<Circle[]>([{ id: '1', cx: 100, cy: 100, r: 20, fill: 'transparent' }]);

	type Status = 'drawing' | 'editing';
	let status = $state<Status>('drawing');

	let svg: SVGElement;

	let selected: Circle = $state(null!);
	$inspect({ selected });

	function drawCircle(e: MouseEvent) {
		console.log('drawCircle', e);

		if (status !== 'drawing') {
			status = 'drawing';
			selected = null!;
			return;
		}
		if (selected) {
			return;
		}
		const { top, left } = svg.getBoundingClientRect();
		const newCircle: Circle = {
			id: window.crypto.randomUUID(),
			cx: +(e.clientX - left).toFixed(),
			cy: +(e.clientY - top).toFixed(),
			r: 20,
      fill: 'transparent'
		};
		circles = [...circles, newCircle];
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="page-content-wrap">
	<h3 class="block mb-4 text-white text-3xl underline text-center">Circles</h3>

	<div class="flex flex-row gap-2 justify-center">
		<button class="w-32 btn btn-warning btn-sm">Undo</button>
		<button class="w-32 btn btn-success btn-sm">Redo</button>
	</div>

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<svg
		bind:this={svg}
		class="circle-svg m-4 bg-slate-700 rounded-xl hover:cursor-crosshair"
		viewBox="0 0 640 480"
		onclick={drawCircle}
	>
		{#each circles as circle (circle.id)}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_mouse_events_have_key_events -->
			<circle
				{...circle}
				stroke={selected === circle ? '#ff0000' : 'white'}
				stroke-width="1"
				onmouseover={() => (selected = circle)}
				class="hover:cursor-pointer"
				onmouseout={() => {
					if (status !== 'editing') {
						selected = null!;
					}
				}}
				onclick={(e) => {
					e.stopPropagation();
					console.log('clicked circle');
					status = 'editing';
				}}
				oncontextmenu={(e) => {
					e.preventDefault();
					e.stopPropagation();
					status = 'editing';
				}}
			/>
		{/each}
	</svg>

	{#if selected && status === 'editing'}
		<div class="adjust">
			<div class="flex flex-row gap-4 justify-center align-middle">
				<p class="text-lg">Adjust Radius:</p>
				<input type="range" class="w-72" min="5" max="100" step="1" bind:value={selected.r} />
				<button class="btn btn-xs bg-red-600" onclick={() => (selected.fill = '#ff0000')}>R</button>
				<button class="btn btn-xs bg-green-600" onclick={() => (selected.fill = '#00ff00')}
					>G</button
				>
				<button class="btn btn-xs bg-blue-600" onclick={() => (selected.fill = '#0000ff')}>B</button
				>
			</div>
		</div>
	{/if}
</div>

<style>
	.circle-svg {
		width: 640px;
		height: 480px;
		.circle {
			border: none;
			outline: none;
			&.active {
				border: none;
				outline: none;
			}
		}
	}

	.adjust {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 640px;
		transform: translate(-50%, -50%);
		padding: 1rem;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 10;
	}
</style>
