import { SearchEpisodeLimitCriteria } from '@domain';
import { describe, expect, it } from 'vitest';

describe('SearchEpisodeLimitCriteria', () => {
	it('creates an instance when a valid value is provided', () => {
		const id = new SearchEpisodeLimitCriteria(12);
		expect(id.value).toBe(12);
	});

	it('throws an error when the value is less than 0', () => {
		expect(() => new SearchEpisodeLimitCriteria(-1)).toThrow('Limit must be greater than zero');
	});

	it('throws an error when the value is greater than 20', () => {
		expect(() => new SearchEpisodeLimitCriteria(21)).toThrow('Limit must be less than or equal to 20');
	});

	it('throws an error when the value is null', () => {
		// eslint-disable-next-line unicorn/no-null
		expect(() => new SearchEpisodeLimitCriteria(null as unknown as number)).toThrow('Limit cannot be empty');
	});

	it('throws an error when the value is undefined', () => {
		expect(() => new SearchEpisodeLimitCriteria(undefined as unknown as number)).toThrow('Limit cannot be empty');
	});

	it('throws an error when the value is NaN', () => {
		expect(() => new SearchEpisodeLimitCriteria(Number.NaN as unknown as number)).toThrow('Limit must be a number');
	});

	it('throws an error when the value is not number type', () => {
		expect(() => new SearchEpisodeLimitCriteria({} as unknown as number)).toThrow('Limit must be a number');
	});
});
