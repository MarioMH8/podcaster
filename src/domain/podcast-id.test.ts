import { PodcastId } from '@domain';
import { describe, expect, it } from 'vitest';

describe('PodcastId', () => {
	it('creates an instance when a valid value is provided', () => {
		const id = new PodcastId(12);
		expect(id.value).toBe(12);
	});

	it('throws an error when the value is null', () => {
		// eslint-disable-next-line unicorn/no-null
		expect(() => new PodcastId(null as unknown as number)).toThrow('Podcast id cannot be empty');
	});

	it('throws an error when the value is undefined', () => {
		expect(() => new PodcastId(undefined as unknown as number)).toThrow('Podcast id cannot be empty');
	});

	it('throws an error when the value is NaN', () => {
		expect(() => new PodcastId(Number.NaN as unknown as number)).toThrow('Podcast id must be a number');
	});

	it('throws an error when the value is not number type', () => {
		expect(() => new PodcastId({} as unknown as number)).toThrow('Podcast id must be a number');
	});
});
