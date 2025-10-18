import { SearchEpisodeCriteria } from '@domain';
import { describe, expect, it } from 'vitest';

describe('SearchEpisodeCriteria', () => {
	it('creates SearchEpisodeCriteria with valid primitives', () => {
		const primitives = { limit: 10, podcast: 5 };

		const criteria = new SearchEpisodeCriteria(primitives);

		expect(criteria.podcast.value).toBe(primitives.podcast);
		expect(criteria.limit.value).toBe(primitives.limit);
	});
});
