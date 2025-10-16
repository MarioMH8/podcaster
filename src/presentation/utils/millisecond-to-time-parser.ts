export default function parseMillisecondToTime(millisecond?: null | number): string {
	if (!millisecond || millisecond < 0) {
		return '-';
	}
	const totalSeconds = Math.floor(millisecond / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	const hoursString = hours > 0 ? `${hours.toFixed(0)}:` : '';
	const minutesString = hours > 0 ? String(minutes).padStart(2, '0') : String(minutes);
	const secondsString = String(seconds).padStart(2, '0');

	return `${hoursString}${minutesString}:${secondsString}`;
}
