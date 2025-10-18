import { PodcastName } from '@domain';
import { describe, expect, it } from 'vitest';

describe('PodcastName', () => {
	it('creates an instance when a valid value is provided', () => {
		const name = new PodcastName('A Great Podcast');
		expect(name.value).toBe('A Great Podcast');
	});

	it('throws an error when the value is an empty string', () => {
		expect(() => new PodcastName('')).toThrow('Podcast name cannot be empty');
	});

	it('throws an error when the value is null', () => {
		// eslint-disable-next-line unicorn/no-null
		expect(() => new PodcastName(null as unknown as string)).toThrow('Podcast name cannot be empty');
	});

	it('throws an error when the value is undefined', () => {
		expect(() => new PodcastName(undefined as unknown as string)).toThrow('Podcast name cannot be empty');
	});
});
