import { EpisodeUrl } from '@domain';
import { describe, expect, it } from 'vitest';

describe('EpisodeUrl', () => {
	it('creates an instance when a valid value is provided', () => {
		const url = new EpisodeUrl('https://example.com/episode1');
		expect(url.value).toBe('https://example.com/episode1');
	});

	it('throws an error when the value is an empty string', () => {
		expect(() => new EpisodeUrl('')).toThrow('Episode url cannot be empty');
	});

	it('throws an error when the value is null', () => {
		// eslint-disable-next-line unicorn/no-null
		expect(() => new EpisodeUrl(null as unknown as string)).toThrow('Episode url cannot be empty');
	});

	it('throws an error when the value is undefined', () => {
		expect(() => new EpisodeUrl(undefined as unknown as string)).toThrow('Episode url cannot be empty');
	});
});
