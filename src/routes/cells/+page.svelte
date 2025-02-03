<script lang="ts">
	const rows = 10;
	// NOTE max 26 cols
	const cols = 10;
	// TODO make more dynamic in order to support > 26 cols
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	type Cell = { value: string };
	const cells = $state<Cell[][]>([
		[{ value: 'Item' }, { value: 'Price' }, { value: 'Amount' }, { value: 'Total' }],
		[{ value: '🍌' }, { value: '1' }, { value: '4' }, { value: '=MUL(B2,C2)' }],
		[{ value: '🍎' }, { value: '2' }, { value: '2' }, { value: '=MUL(B3,C3)' }],
		[{ value: '' }, { value: '' }, { value: 'Total' }, { value: '=SUM(D2,D3)' }]
	]);

	let selectedCell = $state<string>(null!);
	let editedCell = $state<string>(null!);

	function parseValue(value: string): string | number {
		if (value.startsWith('=')) {
			const { opName, refCells } = parseFormula(value);
			// NOTE call parseValue recursively on each referenced cell
			const values = refCells.map(({ row, col }) => {
				const value = cells[row]?.[col]?.value;
				if (value?.startsWith('=')) {
					return +parseValue(value);
				}
				return +value;
			});
			// write a reducer to handle SUM and MUL
			const opFunc =
				opName === 'SUM' ? (a: number, b: number) => a + b : (a: number, b: number) => a * b;
			const base = opName === 'SUM' ? 0 : opName === 'MUL' ? 1 : 0;
			return values.reduce((acc, val) => opFunc(acc, val), base);
		}
		return value;
	}

	function parseFormula(formula: string) {
		// =MUL(a,b)
		const [a, b] = formula.split('(');
		const opName = a.split('=')[1];
		const refCells = b.replace(')', '').split(',');
		return { opName, refCells: refCells.map(cellNameToIndex) };
	}

	function cellNameToIndex(value: string) {
		// A1 -> 00 -> cells[0][0]
		// NOTE the ...row catches multiple-digit row numbers (10,11,999,...)
		const [col, ...row] = value.split('');
		// TODO handle row > 26
		return { row: +row.join('') - 1, col: letters.toLowerCase().indexOf(col.toLowerCase()) };
	}

	// NOTE also handles inserting new values into "non-existing" cells
	function update(e: Event) {
		const { value, parentElement } = e.target as HTMLInputElement;
		const { row, col } = cellNameToIndex(parentElement?.dataset.cell!);

		if (!cells[row]) {
			cells[row] = [];
		}
		if (cells[row][col]) {
			cells[row][col].value = value;
		} else {
			cells[row][col] = { value };
		}
	}

	function onkeyup(e: KeyboardEvent) {
		// NOTE on Enter, Esc, we set the editedCell to null
		if (e.key === 'Enter' || e.key === 'Escape') {
			editedCell = null!;
			return;
		}
	}
</script>

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
						{@const value = cells[i]?.[j]?.value}
						{@const parsedValue = value ? parseValue(value) : ''}
						{@const selected = selectedCell === cell}
						{@const editing = editedCell === cell}
						<td
							data-cell={cell}
							class:selected
							onclick={() => {
								if (selected) return;
								selectedCell = cell;
								editedCell = null!;
							}}
							ondblclick={() => {
								editedCell = cell;
							}}
						>
							{#if editing}
								<!-- svelte-ignore a11y_autofocus -->
								<input
									type="text"
									class="w-full"
									{value}
									autofocus
									oninput={update}
									{onkeyup}
									onblur={() => {
										editedCell = null!;
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
