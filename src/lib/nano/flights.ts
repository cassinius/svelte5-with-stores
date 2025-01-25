import { atom, computed } from 'nanostores';

import { formatDate } from '$lib/_helpers/datetime';

export function useNanoFlights() {
	let mode = atom('one-way');

	let t1 = atom<Date>(null!); // formatDate(new Date())
	let t2 = atom<Date>(null!);

	const oneWay = computed(mode, (mode) => mode === 'one-way');
	const validFlight = computed(
		[oneWay, t1, t2],
		(oneWay, t1, t2) => (oneWay && !!t1) || (!!t1 && !!t2 && t1 <= t2)
	);

	const errorOneWayNoDate = computed([oneWay, t1], (oneWay, t1) => oneWay && !t1);
	const errorNoReturnDate = computed([oneWay, t1, t2], (oneWay, t1, t2) => !oneWay && !(t1 && t2));
	const errorInvalidDates = computed([t1, t2], (t1, t2) => !!t1 && !!t2 && t1 > t2);

	return {
		mode,
		setMode(m: 'one-way' | 'return') {
			mode.set(m);
		},
		t1,
		setT1(date: Date) {
			console.log('setT1', date);
			t1.set(date);
		},
		t2,
		setT2(date: Date) {
			console.log('setT2', date);
			t2.set(date);
		},
		oneWay,
		validFlight,
		errorOneWayNoDate,
		errorNoReturnDate,
		errorInvalidDates,
		bookFlight() {
			let msg = `You booked a NANO airways ${mode.value} flight`;
			msg += oneWay.value
				? ` on ${formatDate(t1.value)}`
				: ` from ${formatDate(t1.value)} to ${formatDate(t2.value)}`;
			alert(msg);
		}
	};
}
