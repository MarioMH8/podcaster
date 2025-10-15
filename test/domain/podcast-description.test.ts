import { PodcastDescription } from '@domain';
import { describe, expect, it } from 'vitest';

describe('PodcastDescription', () => {
	it('creates an instance when a valid value is provided', () => {
		const description = new PodcastDescription('A great podcast');
		expect(description.value).toBe('A great podcast');
	});

	it('throws an error when the value is an empty string', () => {
		expect(() => new PodcastDescription('')).toThrow('Podcast description cannot be empty');
	});

	it('throws an error when the value is null', () => {
		// eslint-disable-next-line unicorn/no-null
		expect(() => new PodcastDescription(null as unknown as string)).toThrow('Podcast description cannot be empty');
	});

	it('throws an error when the value is undefined', () => {
		expect(() => new PodcastDescription(undefined as unknown as string)).toThrow(
			'Podcast description cannot be empty'
		);
	});
});
