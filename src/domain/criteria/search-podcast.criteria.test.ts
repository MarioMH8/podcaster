import { SearchPodcastCriteria } from '@domain';
import { describe, expect, it } from 'vitest';

describe('SearchPodcastCriteria', () => {
	it('creates SearchPodcastCriteria with valid primitives', () => {
		const primitives = { genre: 5, limit: 10 };

		const criteria = new SearchPodcastCriteria(primitives);

		expect(criteria.genre.value).toBe(primitives.genre);
		expect(criteria.limit.value).toBe(primitives.limit);
	});
});
