import { EpisodeDescription } from '@domain';
import { describe, expect, it } from 'vitest';

describe('EpisodeDescription', () => {
	it('creates an instance when a valid value is provided', () => {
		const description = new EpisodeDescription('A great episode');
		expect(description.value).toBe('A great episode');
	});

	it('throws an error when the value is an empty string', () => {
		expect(() => new EpisodeDescription('')).toThrow('Episode description cannot be empty');
	});

	it('throws an error when the value is null', () => {
		// eslint-disable-next-line unicorn/no-null
		expect(() => new EpisodeDescription(null as unknown as string)).toThrow('Episode description cannot be empty');
	});

	it('throws an error when the value is undefined', () => {
		expect(() => new EpisodeDescription(undefined as unknown as string)).toThrow(
			'Episode description cannot be empty'
		);
	});
});
