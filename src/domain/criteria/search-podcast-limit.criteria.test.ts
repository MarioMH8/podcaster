import { SearchPodcastLimitCriteria } from '@domain';
import { describe, expect, it } from 'vitest';

describe('SearchPodcastLimitCriteria', () => {
	it('creates an instance when a valid value is provided', () => {
		const id = new SearchPodcastLimitCriteria(12);
		expect(id.value).toBe(12);
	});

	it('throws an error when the value is less than 0', () => {
		expect(() => new SearchPodcastLimitCriteria(-1)).toThrow('Limit must be greater than zero');
	});

	it('throws an error when the value is greater than 100', () => {
		expect(() => new SearchPodcastLimitCriteria(101)).toThrow('Limit must be less than or equal to 100');
	});

	it('throws an error when the value is null', () => {
		// eslint-disable-next-line unicorn/no-null
		expect(() => new SearchPodcastLimitCriteria(null as unknown as number)).toThrow('Limit cannot be empty');
	});

	it('throws an error when the value is undefined', () => {
		expect(() => new SearchPodcastLimitCriteria(undefined as unknown as number)).toThrow('Limit cannot be empty');
	});

	it('throws an error when the value is NaN', () => {
		expect(() => new SearchPodcastLimitCriteria(Number.NaN as unknown as number)).toThrow('Limit must be a number');
	});

	it('throws an error when the value is not number type', () => {
		expect(() => new SearchPodcastLimitCriteria({} as unknown as number)).toThrow('Limit must be a number');
	});
});
