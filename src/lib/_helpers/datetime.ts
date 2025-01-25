export function formatDate(date: Date) {
	console.log('formatDate', date);

	if (!date) return '';

	// NOTE just to make sure we're not dealing with a string here...
	date = new Date(date);

	const offset = date.getTimezoneOffset();
	date = new Date(date.getTime() - offset * 60 * 1000);
	return date.toISOString().split('T')[0];
}
