import { Episode } from '@domain';
import { describe, expect, it } from 'vitest';

describe('Episode', () => {
	it('creates a Episode instance with valid primitives', () => {
		const primitives = {
			description: 'A episode about technology.',
			duration: 2334,
			id: 1,
			publication: new Date('2023-01-01T10:00:00Z'),
			title: 'Tech Talks',
			url: 'https://example.com/episode.mp3',
		};

		const episode = new Episode(primitives);

		expect(episode.description.value).toBe(primitives.description);
		expect(episode.duration?.value).toBe(primitives.duration);
		expect(episode.id.value).toBe(primitives.id);
		expect(episode.publication.value).toStrictEqual(primitives.publication);
		expect(episode.title.value).toBe(primitives.title);
		expect(episode.url.value).toBe(primitives.url);
	});

	it('returns the correct primitives from toPrimitives', () => {
		const primitives = {
			description: 'A episode about technology.',
			duration: 2334,
			id: 1,
			publication: new Date('2023-01-01T10:00:00Z'),
			title: 'Tech Talks',
			url: 'https://example.com/episode.mp3',
		};

		const episode = new Episode(primitives);

		expect(episode.toPrimitives()).toEqual(primitives);
	});
});
