import { EpisodeSearcher, SearchEpisodeQuery } from '@application';
import { SearchEpisodeCriteria } from '@domain';
import { EPISODE_1, EPISODE_2, EPISODE_3, EPISODE_4, MockEpisodeCacheRepository, MockEpisodeRepository } from '@mock';
import { beforeEach, describe, expect, it } from 'vitest';

describe('EpisodeSearcher', () => {
	let cache: MockEpisodeCacheRepository;
	let repository: MockEpisodeRepository;
	let useCase: EpisodeSearcher;
	let query: SearchEpisodeQuery;
	let criteria: SearchEpisodeCriteria;

	beforeEach(() => {
		cache = new MockEpisodeCacheRepository();
		repository = new MockEpisodeRepository();
		useCase = new EpisodeSearcher(repository, cache);
		query = new SearchEpisodeQuery({ limit: 10, podcast: 1 });
		criteria = new SearchEpisodeCriteria({ limit: 10, podcast: 1 });
	});

	it('should return api episode if cache returns empty array', async () => {
		// Arrange
		repository.searchSpy.mockReturnValueOnce(Promise.resolve([EPISODE_1, EPISODE_2]));
		cache.searchSpy.mockReturnValueOnce([]);

		// Act
		const result = await useCase.run(query);

		// Assert
		expect(result).toStrictEqual([EPISODE_1, EPISODE_2]);
		expect(cache.searchSpy).toHaveBeenCalledOnce();
		expect(cache.searchSpy).toHaveBeenCalledWith(criteria);
		expect(repository.searchSpy).toHaveBeenCalledOnce();
		expect(repository.searchSpy).toHaveBeenCalledWith(criteria);
		expect(cache.upsertSpy).toHaveBeenCalledOnce();
		expect(cache.upsertSpy).toHaveBeenCalledWith(criteria, [EPISODE_1, EPISODE_2]);
	});

	it('should return cached episode if cache repository returns array value', async () => {
		// Arrange
		repository.searchSpy.mockReturnValueOnce(Promise.resolve([EPISODE_1, EPISODE_2]));
		cache.searchSpy.mockReturnValueOnce([EPISODE_3, EPISODE_4]);

		// Act
		const result = await useCase.run(query);

		// Assert
		expect(result).toStrictEqual([EPISODE_3, EPISODE_4]);
		expect(cache.searchSpy).toHaveBeenCalledOnce();
		expect(cache.searchSpy).toHaveBeenCalledWith(criteria);
		expect(repository.searchSpy).not.toHaveBeenCalled();
		expect(cache.upsertSpy).not.toHaveBeenCalled();
	});
});
