<script lang="ts">
	const rows = 10;
	const cols = 10;
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	type Cell = { value: string };
	const cells = $state<Cell[][]>([
		[{ value: 'Item' }, { value: 'Price' }, { value: 'Amount' }, { value: 'Total' }],
		[{ value: '🍌' }, { value: '1' }, { value: '4' }, { value: '=MUL(B2,C2' }],
		[{ value: '🍎' }, { value: '2' }, { value: '2' }, { value: '=MUL(B3,C3' }],
		[{ value: '' }, { value: '' }, { value: 'Total' }, { value: '=SUM(D2:D3)' }]
	]);

	let selectedCell = $state<Cell>(null!);
	let editedCell = $state<Cell>(null!);
</script>

<div class="page-content-wrap">
	<h3 class="block mb-4 text-3xl underline text-center">Svelte Sheet!</h3>

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
						{@const value = cells[i]?.[j]?.value}
						<td>{value}</td>
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
			padding: 0 10px 0 5px;
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
