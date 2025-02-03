export function useRuneCells(rows: number, cols: number, letters: string) {
	type Cell = { value: string };

	const data = $state<Cell[][]>([
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
				const value = data[row]?.[col]?.value;
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

		if (!data[row]) {
			data[row] = [];
		}
		if (data[row][col]) {
			data[row][col].value = value;
		} else {
			data[row][col] = { value };
		}
	}

	function cellKeyUp(e: KeyboardEvent) {
		console.log('cellKeyUp', e);
		// NOTE on Delete, we delete the value & set the edited cell to null
		if (e.key === 'Delete' || e.key === 'Backspace') {
			const { row, col } = cellNameToIndex(selectedCell);
			if (data[row] && data[row][col]) {
				data[row][col].value = '';
				editedCell = null!;
			}
			return;
		}
	}

	function inputKeyup(e: KeyboardEvent) {
		// NOTE on Enter, Esc, we set the editedCell to null
		if (e.key === 'Enter' || e.key === 'Escape') {
			editedCell = null!;
			return;
		}
	}

	return {
		get data() {
			return data;
		},
		get selectedCell() {
			return selectedCell;
		},
		set selectedCell(value: string) {
			selectedCell = value;
		},
		get editedCell() {
			return editedCell;
		},
		set editedCell(value: string) {
			editedCell = value;
		},
		parseValue,
		parseFormula,
		cellNameToIndex,
		update,
		cellKeyUp,
		inputKeyup
	};
}
