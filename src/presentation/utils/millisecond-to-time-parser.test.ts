import { parseMillisecondToTime } from '@presentation/utils';
import { describe, expect, it } from 'vitest';

describe('parseMillisecondToTime', () => {
	it('returns dash when input is undefined', () => {
		const result = parseMillisecondToTime();
		expect(result).toBe('-');
	});

	it('returns dash when input is null', () => {
		// eslint-disable-next-line unicorn/no-null
		const result = parseMillisecondToTime(null);
		expect(result).toBe('-');
	});

	it('returns dash when input is negative', () => {
		const result = parseMillisecondToTime(-1000);
		expect(result).toBe('-');
	});

	it('formats milliseconds less than a minute correctly', () => {
		const result = parseMillisecondToTime(45_000);
		expect(result).toBe('0:45');
	});

	it('formats milliseconds into minutes and seconds correctly', () => {
		const result = parseMillisecondToTime(125_000);
		expect(result).toBe('2:05');
	});

	it('formats milliseconds into hours, minutes, and seconds correctly', () => {
		const result = parseMillisecondToTime(3_661_000);
		expect(result).toBe('1:01:01');
	});

	it('formats exactly one hour correctly', () => {
		const result = parseMillisecondToTime(3_600_000);
		expect(result).toBe('1:00:00');
	});

	it('formats zero milliseconds as zero seconds', () => {
		const result = parseMillisecondToTime(0);
		expect(result).toBe('-');
	});
});
