<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	import { useRuneCircles } from '$lib/runes/circles.svelte';

	const circles = useRuneCircles();

	onMount(() => {
		if (!browser) {
			return;
		}

		window.onkeyup = (e) => {
			if (e.key === 'ArrowLeft' && e.ctrlKey) {
				e.preventDefault();
				circles.undo();
			}
			if (e.key === 'ArrowRight' && e.ctrlKey) {
				e.preventDefault();
				circles.redo();
			}
		};
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="page-content-wrap">
	<h3 class="block mb-4 text-white text-3xl underline text-center">Circles</h3>

	<div class="flex flex-row gap-2 justify-center">
		<button
			class="w-32 btn btn-warning btn-sm"
			disabled={circles.history < 0}
			onclick={circles.undo}>Undo</button
		>
		<button
			class="w-32 btn btn-success btn-sm"
			disabled={circles.history >= circles.snapshots.length - 1}
			onclick={circles.redo}>Redo</button
		>
	</div>

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<svg
		bind:this={circles.svg}
		class="circle-svg m-4 bg-slate-700 rounded-xl hover:cursor-crosshair"
		viewBox="0 0 640 480"
		onclick={circles.drawCircle}
	>
		{#each circles.circles as circle (circle.id)}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_mouse_events_have_key_events -->
			<circle
				{...circle}
				stroke={circles.selected === circle ? '#ff0000' : 'white'}
				stroke-width="1"
				onmouseover={() => {
					if (circles.status === 'editing') {
						return;
					}
					circles.selected = circle;
				}}
				class="hover:cursor-pointer"
				onmouseout={() => {
					if (circles.status !== 'editing') {
						circles.selected = null!;
					}
				}}
				onclick={(e) => {
					e.stopPropagation();
					console.log('clicked circle');
					circles.backup = { ...circle };
					circles.status = 'editing';
				}}
				oncontextmenu={(e) => {
					e.preventDefault();
					e.stopPropagation();
					circles.backup = { ...circle };
					circles.status = 'editing';
				}}
			/>
		{/each}
	</svg>

	{#if circles.selected && circles.status === 'editing'}
		<div class="adjust">
			<div class="flex flex-row gap-4 justify-center items-center">
				<p class="text-lg text-white">Adjust Radius:</p>
				<input
					type="range"
					class="w-72 bg-red-400"
					min="5"
					max="100"
					step="1"
					bind:value={circles.selected.r}
				/>
				<button class="btn btn-xs bg-red-600" onclick={() => (circles.selected.fill = '#ff0000')}
					>R</button
				>
				<button class="btn btn-xs bg-green-600" onclick={() => (circles.selected.fill = '#00ff00')}
					>G</button
				>
				<button class="btn btn-xs bg-blue-600" onclick={() => (circles.selected.fill = '#0000ff')}
					>B</button
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
