import { Podcast } from '@domain';
import { describe, expect, it } from 'vitest';

describe('Podcast', () => {
	it('creates a Podcast instance with valid primitives', () => {
		const primitives = {
			author: 'John Doe',
			description: 'A podcast about technology.',
			id: 1,
			image: 'https://example.com/podcast.jpg',
			name: 'Tech Talks',
		};

		const podcast = new Podcast(primitives);

		expect(podcast.author.value).toBe(primitives.author);
		expect(podcast.description.value).toBe(primitives.description);
		expect(podcast.id.value).toBe(primitives.id);
		expect(podcast.name.value).toBe(primitives.name);
		expect(podcast.image.value).toBe(primitives.image);
	});

	it('returns the correct primitives from toPrimitives', () => {
		const primitives = {
			author: 'John Doe',
			description: 'A podcast about technology.',
			id: 1,
			image: 'https://example.com/podcast.jpg',
			name: 'Tech Talks',
		};

		const podcast = new Podcast(primitives);

		expect(podcast.toPrimitives()).toEqual(primitives);
	});
});
