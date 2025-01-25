import { formatDate } from '$lib/_helpers/datetime';

export function useRuneFlights() {
	type FlightMode = 'one-way' | 'return';

	let mode: FlightMode = $state('one-way');

	let t1 = $state<Date>(null!); // dateTimeFormat.format(new Date())
	let t2 = $state<Date>(null!);

	const oneWay = $derived<boolean>(mode === 'one-way');
	const validFlight = $derived<boolean>((oneWay && !!t1) || (t1 && t2 && t1 <= t2));

	const errorOneWayNoDate = $derived<boolean>(oneWay && !t1);
	const errorNoReturnDate = $derived<boolean>(!oneWay && !(t1 && t2));
	const errorInvalidDates = $derived<boolean>(t1 && t2 && t1 > t2);

	// NOTE this points to the object returned, damn it Bernie...
	return {
		get mode() {
			return mode;
		},
		set mode(value: FlightMode) {
			mode = value;
		},
		get t1() {
			return t1;
		},
		set t1(value: Date) {
			t1 = value;
		},
		get t2() {
			return t2;
		},
		set t2(value: Date) {
			t2 = value;
		},
		get oneWay() {
			return oneWay;
		},
		get validFlight() {
			return validFlight;
		},
		get errorOneWayNoDate() {
			return errorOneWayNoDate;
		},
		get errorNoReturnDate() {
			return errorNoReturnDate;
		},
		get errorInvalidDates() {
			return errorInvalidDates;
		},
		bookFlight() {
			let msg = `You booked a RUNES airways ${mode} flight`;
			msg += oneWay ? ` on ${t1}` : ` from ${t1} to ${t2}`;
			alert(msg);
		}
	};
}
