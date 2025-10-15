import { PodcastSearcher, SearchPodcastQuery } from '@application';
import { Podcast, SearchPodcastCriteria } from '@domain';
import { MockPodcastCacheRepository, MockPodcastRepository } from '@mock';
import { beforeEach, describe, expect, it } from 'vitest';

const PODCAST_1 = new Podcast({
	author: 'Author 1',
	description: 'Description 1',
	id: 1,
	name: 'Podcast 1',
});

const PODCAST_2 = new Podcast({
	author: 'Author 2',
	description: 'Description 2',
	id: 2,
	name: 'Podcast 2',
});

const PODCAST_3 = new Podcast({
	author: 'Author 3',
	description: 'Description 3',
	id: 3,
	name: 'Podcast 3',
});

const PODCAST_4 = new Podcast({
	author: 'Author 4',
	description: 'Description 4',
	id: 4,
	name: 'Podcast 4',
});

describe('PodcastSearcher', () => {
	let cache: MockPodcastCacheRepository;
	let repository: MockPodcastRepository;
	let useCase: PodcastSearcher;
	let query: SearchPodcastQuery;
	let criteria: SearchPodcastCriteria;

	beforeEach(() => {
		cache = new MockPodcastCacheRepository();
		repository = new MockPodcastRepository();
		useCase = new PodcastSearcher(repository, cache);
		query = new SearchPodcastQuery({ genre: 1, limit: 10 });
		criteria = new SearchPodcastCriteria({ genre: 1, limit: 10 });
	});

	it('should return api podcast if cache returns empty array', async () => {
		// Arrange
		repository.searchSpy.mockReturnValueOnce(Promise.resolve([PODCAST_1, PODCAST_2]));
		cache.searchSpy.mockReturnValueOnce([]);

		// Act
		const result = await useCase.run(query);

		// Assert
		expect(result).toStrictEqual([PODCAST_1, PODCAST_2]);
		expect(cache.searchSpy).toHaveBeenCalledOnce();
		expect(cache.searchSpy).toHaveBeenCalledWith(criteria);
		expect(repository.searchSpy).toHaveBeenCalledOnce();
		expect(repository.searchSpy).toHaveBeenCalledWith(criteria);
		expect(cache.upsertSpy).toHaveBeenCalledOnce();
		expect(cache.upsertSpy).toHaveBeenCalledWith(criteria, [PODCAST_1, PODCAST_2]);
	});

	it('should return cached podcast if cache repository returns array value', async () => {
		// Arrange
		repository.searchSpy.mockReturnValueOnce(Promise.resolve([PODCAST_1, PODCAST_2]));
		cache.searchSpy.mockReturnValueOnce([PODCAST_3, PODCAST_4]);

		// Act
		const result = await useCase.run(query);

		// Assert
		expect(result).toStrictEqual([PODCAST_3, PODCAST_4]);
		expect(cache.searchSpy).toHaveBeenCalledOnce();
		expect(cache.searchSpy).toHaveBeenCalledWith(criteria);
		expect(repository.searchSpy).not.toHaveBeenCalled();
		expect(cache.upsertSpy).not.toHaveBeenCalled();
	});
});
