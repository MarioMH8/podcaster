import { PodcastAuthor } from '@domain';
import { describe, expect, it } from 'vitest';

describe('PodcastAuthor', () => {
	it('creates an instance when a valid value is provided', () => {
		const author = new PodcastAuthor('John Doe');
		expect(author.value).toBe('John Doe');
	});

	it('throws an error when the value is an empty string', () => {
		expect(() => new PodcastAuthor('')).toThrow('Podcast author cannot be empty');
	});

	it('throws an error when the value is null', () => {
		// eslint-disable-next-line unicorn/no-null
		expect(() => new PodcastAuthor(null as unknown as string)).toThrow('Podcast author cannot be empty');
	});

	it('throws an error when the value is undefined', () => {
		expect(() => new PodcastAuthor(undefined as unknown as string)).toThrow('Podcast author cannot be empty');
	});
});
