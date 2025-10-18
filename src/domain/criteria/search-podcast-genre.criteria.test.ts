import { SearchPodcastGenreCriteria } from '@domain';
import { describe, expect, it } from 'vitest';

describe('SearchPodcastGenreCriteria', () => {
	it('creates an instance when a valid value is provided', () => {
		const id = new SearchPodcastGenreCriteria(12);
		expect(id.value).toBe(12);
	});

	it('throws an error when the value is null', () => {
		// eslint-disable-next-line unicorn/no-null
		expect(() => new SearchPodcastGenreCriteria(null as unknown as number)).toThrow('Genre cannot be empty');
	});

	it('throws an error when the value is undefined', () => {
		expect(() => new SearchPodcastGenreCriteria(undefined as unknown as number)).toThrow('Genre cannot be empty');
	});

	it('throws an error when the value is NaN', () => {
		expect(() => new SearchPodcastGenreCriteria(Number.NaN as unknown as number)).toThrow('Genre must be a number');
	});

	it('throws an error when the value is not number type', () => {
		expect(() => new SearchPodcastGenreCriteria({} as unknown as number)).toThrow('Genre must be a number');
	});
});
