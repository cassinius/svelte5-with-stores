<script lang="ts">
	type FlightMode = 'one-way' | 'return';

	let mode: FlightMode = $state('one-way');

	let t1 = $state(null);
	let t2 = $state(null);

	let oneWay = $derived(mode === 'one-way');
	let validFlight = $derived((oneWay && t1) || (t1 && t2 && t1 < t2));

	let errorOneWayNoDate = $derived(oneWay && !t1);
	let errorNoReturnDate = $derived(!oneWay && !(t1 && t2));
	let errorInvalidDates = $derived(t1 && t2 && t1 > t2);

	function bookFlight() {
		let msg = `You booked a ${mode} flight`;
		msg += oneWay ? ` on ${t1}` : ` from ${t1} to ${t2}`;
		alert(msg);
	}
</script>

<h3>Flight Runes</h3>
<div class="flex flex-col gap-2">
	<select bind:value={mode} class="w-32 rounded">
		<option value="one-way">one-way</option>
		<option value="return">return</option>
	</select>

	<input type="date" bind:value={t1} class="w-32 rounded" />
	<input
		type="date"
		bind:value={t2}
		class="w-32 rounded"
		class:disabled={oneWay}
		disabled={oneWay}
	/>

	<div class="error text-error">
		{(errorOneWayNoDate && 'Please select a date') ||
			(errorNoReturnDate && 'Please select start and return dates') ||
			(errorInvalidDates && 'Return date must be after start date') ||
			''}
	</div>
	<button class="btn btn-success btn-sm w-32" disabled={!validFlight} onclick={bookFlight}>
		<h4>Book flight</h4></button
	>
</div>
