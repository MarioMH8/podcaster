import { PodcastSearcher, SearchPodcastQuery } from '@application';
import { SearchPodcastCriteria } from '@domain';
import { MockPodcastCacheRepository, MockPodcastRepository, PODCAST_1, PODCAST_2, PODCAST_3, PODCAST_4 } from '@mock';
import { beforeEach, describe, expect, it } from 'vitest';

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
