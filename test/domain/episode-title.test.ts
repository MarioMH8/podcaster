import { EpisodeTitle } from '@domain';
import { describe, expect, it } from 'vitest';

describe('EpisodeTitle', () => {
	it('creates an instance when a valid value is provided', () => {
		const title = new EpisodeTitle('A Great Episode');
		expect(title.value).toBe('A Great Episode');
	});

	it('throws an error when the value is an empty string', () => {
		expect(() => new EpisodeTitle('')).toThrow('Episode title cannot be empty');
	});

	it('throws an error when the value is null', () => {
		// eslint-disable-next-line unicorn/no-null
		expect(() => new EpisodeTitle(null as unknown as string)).toThrow('Episode title cannot be empty');
	});

	it('throws an error when the value is undefined', () => {
		expect(() => new EpisodeTitle(undefined as unknown as string)).toThrow('Episode title cannot be empty');
	});
});
