<script lang="ts">
	import { useRuneFlights } from '$lib/runes/flights.svelte';
	import { useNanoFlights } from '$lib/nano/flights';
	import { formatDate } from '$lib/_helpers/datetime';

	type FlightMode = 'one-way' | 'return';

	const runy = useRuneFlights();
	const {
		mode: nanoMode,
		t1: nanoT1,
		t2: nanoT2,
		setMode: nanoSetMode,
		setT1: nanoSetT1,
		setT2: nanoSetT2,
		oneWay: nanoOneWay,
		validFlight: nanoValidFlight,
		errorOneWayNoDate: nanoErrorOneWayNoDate,
		errorNoReturnDate: nanoErrorNoReturnDate,
		errorInvalidDates: nanoErrorInvalidDates,
		bookFlight: nanoBookFlight
	} = useNanoFlights();
</script>

<div class="page-content-wrap flex-row gap-4">
	<div class="flex flex-col gap-2">
		<h3>Rune Flights</h3>
		<select bind:value={runy.mode} class="w-32 rounded">
			<option value="one-way">one-way</option>
			<option value="return">return</option>
		</select>

		<input type="date" bind:value={runy.t1} min={formatDate(new Date())} class="w-32 rounded" />
		<input
			type="date"
			bind:value={runy.t2}
			min={runy.t1 ? formatDate(runy.t1) : formatDate(new Date())}
			class="w-32 rounded"
			class:invalid={runy.errorInvalidDates}
			class:disabled={runy.oneWay}
			disabled={runy.oneWay}
		/>

		<div class="error text-error">
			{(runy.errorOneWayNoDate && 'Please select a date') ||
				(runy.errorNoReturnDate && 'Please select start and return dates') ||
				(runy.errorInvalidDates && 'Return date must be after start date') ||
				''}
		</div>
		<button
			class="btn btn-success btn-sm w-32"
			disabled={!runy.validFlight}
			onclick={runy.bookFlight}
		>
			<h4>Book flight</h4></button
		>
	</div>

	<div class="flex flex-col gap-2">
		<h3>Nano Flights</h3>
		<select
			value={$nanoMode}
			oninput={(e) => nanoSetMode(e.currentTarget.value as FlightMode)}
			class="w-32 rounded"
		>
			<option value="one-way">one-way</option>
			<option value="return">return</option>
		</select>

		<input
			type="date"
			value={formatDate($nanoT1)}
			min={formatDate(new Date())}
			onchange={(e) => nanoSetT1(e.currentTarget.valueAsDate!)}
			class="w-32 rounded"
		/>
		<input
			type="date"
			value={formatDate($nanoT2)}
			min={$nanoT1 ? formatDate($nanoT1) : formatDate(new Date())}
			onchange={(e) => nanoSetT2(e.currentTarget.valueAsDate!)}
			class="w-32 rounded"
			class:invalid={$nanoErrorInvalidDates}
			class:disabled={$nanoOneWay}
			disabled={$nanoOneWay}
		/>

		<div class="error text-error">
			{($nanoErrorOneWayNoDate && 'Please select a date') ||
				($nanoErrorNoReturnDate && 'Please select start and return dates') ||
				($nanoErrorInvalidDates && 'Return date must be after start date') ||
				''}
		</div>
		<button
			class="btn btn-success btn-sm w-32"
			disabled={!$nanoValidFlight}
			onclick={nanoBookFlight}
		>
			<h4>Book flight</h4></button
		>
	</div>
</div>
