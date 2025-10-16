import { EpisodePublication } from '@domain';
import { describe, expect, it } from 'vitest';

describe('EpisodePublication', () => {
	it('creates an instance when a valid value is provided', () => {
		const date = new Date('2023-10-01T12:00:00Z');
		const publication = new EpisodePublication(date);
		expect(publication.value).toBe(date);
	});

	it('throws an error when the value is null', () => {
		// eslint-disable-next-line unicorn/no-null
		expect(() => new EpisodePublication(null as unknown as Date)).toThrow('Episode publication cannot be empty');
	});

	it('throws an error when the value is undefined', () => {
		expect(() => new EpisodePublication(undefined as unknown as Date)).toThrow(
			'Episode publication cannot be empty'
		);
	});
});
