import { EpisodeId } from '@domain';
import { describe, expect, it } from 'vitest';

describe('EpisodeId', () => {
	it('creates an instance when a valid value is provided', () => {
		const id = new EpisodeId(12);
		expect(id.value).toBe(12);
	});

	it('throws an error when the value is null', () => {
		// eslint-disable-next-line unicorn/no-null
		expect(() => new EpisodeId(null as unknown as number)).toThrow('Episode id cannot be empty');
	});

	it('throws an error when the value is undefined', () => {
		expect(() => new EpisodeId(undefined as unknown as number)).toThrow('Episode id cannot be empty');
	});

	it('throws an error when the value is NaN', () => {
		expect(() => new EpisodeId(Number.NaN as unknown as number)).toThrow('Episode id must be a number');
	});

	it('throws an error when the value is not number type', () => {
		expect(() => new EpisodeId({} as unknown as number)).toThrow('Episode id must be a number');
	});
});
