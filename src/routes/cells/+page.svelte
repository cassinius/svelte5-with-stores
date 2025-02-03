<script lang="ts">
	import { useRuneCells } from '$lib/runes/cells.svelte';

	const rows = 10;
	// NOTE max 26 cols
	const cols = 10;
	// TODO make more dynamic in order to support > 26 cols
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	const cells = useRuneCells(rows, cols, letters);
</script>

<svelte:body onkeyup={cells.cellKeyUp} />

<div class="bg-black p-20 rounded-3xl">
	<h3 class="block mb-10 text-3xl text-slate-50 underline text-center">Svelte Sheet!</h3>

	<table>
		<thead>
			<tr>
				<!-- The empty cell on the top left -->
				<th></th>
				{#each Array(cols) as _, i}
					{@const idx = i >= letters.length ? i % letters.length : i}
					<th>{letters[idx]}</th>
				{/each}
			</tr>
		</thead>

		<tbody>
			{#each Array(rows) as _, i}
				<tr>
					<th>{i + 1}</th>
					{#each Array(cols) as _, j}
						{@const idx = j >= letters.length ? j % letters.length : j}
						{@const cell = `${letters[idx]}${i + 1}`}
						{@const value = cells.data[i]?.[j]?.value}
						{@const parsedValue = value ? cells.parseValue(value) : ''}
						{@const selected = cells.selectedCell === cell}
						{@const editing = cells.editedCell === cell}
						<td
							data-cell={cell}
							class:selected
							onclick={() => {
								if (selected) return;
								cells.selectedCell = cell;
								cells.editedCell = null!;
							}}
							ondblclick={() => {
								cells.editedCell = cell;
							}}
						>
							{#if editing}
								<!-- svelte-ignore a11y_autofocus -->
								<input
									type="text"
									class="w-full"
									{value}
									autofocus
									oninput={cells.update}
									onkeyup={cells.inputKeyup}
									onblur={() => {
										cells.editedCell = null!;
									}}
								/>
							{:else}
								<span>
									{parsedValue}
								</span>
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	table {
		max-width: 800px;
		color: #eee;
		background-color: #222;

		th {
			background-color: #272727;
			font-weight: bolder;
		}

		td {
			width: 140px;
			height: 40px;
			text-align: right;
			font-weight: 500;
			border: 1px solid #555;

			&.selected {
				outline: 1px solid orangered;
				border-radius: 1;
			}

			input {
				height: 100%;
				padding: 0;
				background: none;
				outline: none;
				text-align: right;
				border: none;
			}

			input,
			span {
				padding: 0 10px 0 5px;
			}
		}

		thead th {
			padding: 5px 0;
		}

		tbody th {
			padding: 0 10px;
		}
	}
</style>
