import { EpisodeDuration } from '@domain';
import { describe, expect, it } from 'vitest';

describe('EpisodeDuration', () => {
	it('creates an instance when a valid value is provided', () => {
		const duration = new EpisodeDuration(12);
		expect(duration.value).toBe(12);
	});

	it('throws an error when the value is null', () => {
		// eslint-disable-next-line unicorn/no-null
		expect(() => new EpisodeDuration(null as unknown as number)).toThrow('Episode duration cannot be empty');
	});

	it('throws an error when the value is undefined', () => {
		expect(() => new EpisodeDuration(undefined as unknown as number)).toThrow('Episode duration cannot be empty');
	});

	it('throws an error when the value is NaN', () => {
		expect(() => new EpisodeDuration(Number.NaN as unknown as number)).toThrow('Episode duration must be a number');
	});

	it('throws an error when the value is not number type', () => {
		expect(() => new EpisodeDuration({} as unknown as number)).toThrow('Episode duration must be a number');
	});
});
