import { PodcastImage } from '@domain';
import { describe, expect, it } from 'vitest';

describe('PodcastImage', () => {
	it('creates an instance when a valid value is provided', () => {
		const image = new PodcastImage('A Great Podcast');
		expect(image.value).toBe('A Great Podcast');
	});

	it('throws an error when the value is an empty string', () => {
		expect(() => new PodcastImage('')).toThrow('Podcast image cannot be empty');
	});

	it('throws an error when the value is null', () => {
		// eslint-disable-next-line unicorn/no-null
		expect(() => new PodcastImage(null as unknown as string)).toThrow('Podcast image cannot be empty');
	});

	it('throws an error when the value is undefined', () => {
		expect(() => new PodcastImage(undefined as unknown as string)).toThrow('Podcast image cannot be empty');
	});
});
