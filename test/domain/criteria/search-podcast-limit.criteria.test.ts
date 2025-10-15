import { SearchPodcastLimitCriteria } from '@domain';
import { describe, expect, it } from 'vitest';

describe('SearchPodcastLimitCriteria', () => {
	it('creates an instance when a valid value is provided', () => {
		const id = new SearchPodcastLimitCriteria(12);
		expect(id.value).toBe(12);
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
