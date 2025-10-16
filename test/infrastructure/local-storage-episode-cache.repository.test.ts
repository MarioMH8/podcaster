/* eslint-disable unicorn/no-null */
import { SearchEpisodeCriteria } from '@domain';
import { LocalStorageEpisodeCacheRepository } from '@infrastructure';
import { EPISODE_1, EPISODE_2 } from '@mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('LocalStorageEpisodeCacheRepository', () => {
	let repository: LocalStorageEpisodeCacheRepository;
	const CACHE_DURATION = 1000 * 60 * 5;
	// January 1, 2023 00:00:00 GMT
	const FAKE_TIMESTAMP = 1_672_531_200_000;
	let criteria: SearchEpisodeCriteria;

	const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
	const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
	const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');

	beforeEach(() => {
		vi.useFakeTimers();
		localStorage.clear();
		getItemSpy.mockClear();
		setItemSpy.mockClear();
		removeItemSpy.mockClear();
		repository = new LocalStorageEpisodeCacheRepository(CACHE_DURATION);
		criteria = new SearchEpisodeCriteria({ limit: 10, podcast: 1 });
	});
	afterEach(() => {
		vi.useRealTimers();
	});

	it('should search returns empty array when no cache entry exists for the given criteria', () => {
		// Arrange
		getItemSpy.mockReturnValueOnce(null);

		// Act
		const result = repository.search(criteria);

		// Assert
		expect(result).toEqual([]);
		expect(getItemSpy).toHaveBeenCalledWith('episode_podcast_1_limit_10');
		expect(getItemSpy).toHaveBeenCalledTimes(1);
		expect(setItemSpy).not.toHaveBeenCalled();
		expect(removeItemSpy).not.toHaveBeenCalled();
	});

	it('should search returns empty array when data has expired', () => {
		// Arrange
		vi.setSystemTime(FAKE_TIMESTAMP);
		const cacheEntry = {
			data: [EPISODE_1, EPISODE_2].map(p => p.toPrimitives()),
			timestamp: FAKE_TIMESTAMP - CACHE_DURATION - 1000,
		};
		getItemSpy.mockReturnValueOnce(JSON.stringify(cacheEntry));

		// Act
		const result = repository.search(criteria);

		// Assert
		expect(result).toEqual([]);
		expect(getItemSpy).toHaveBeenCalledWith('episode_podcast_1_limit_10');
		expect(getItemSpy).toHaveBeenCalledTimes(1);
		expect(setItemSpy).not.toHaveBeenCalled();
		expect(removeItemSpy).toHaveBeenCalledWith('episode_podcast_1_limit_10');
	});

	it('should search returns data if data has not expired', () => {
		// Arrange
		vi.setSystemTime(FAKE_TIMESTAMP);
		const cacheEntry = {
			data: [EPISODE_1, EPISODE_2].map(p => p.toPrimitives()),
			timestamp: FAKE_TIMESTAMP - 1000,
		};
		getItemSpy.mockReturnValueOnce(JSON.stringify(cacheEntry));

		// Act
		const result = repository.search(criteria);

		// Assert
		expect(result).toStrictEqual([EPISODE_1, EPISODE_2]);
		expect(getItemSpy).toHaveBeenCalledWith('episode_podcast_1_limit_10');
		expect(setItemSpy).not.toHaveBeenCalled();
		expect(removeItemSpy).not.toHaveBeenCalled();
	});

	it('should update cache', () => {
		// Arrange
		vi.setSystemTime(FAKE_TIMESTAMP);
		const expectedCacheEntry = {
			data: [EPISODE_1, EPISODE_2].map(p => p.toPrimitives()),
			timestamp: FAKE_TIMESTAMP,
		};

		// Act
		repository.upsert(criteria, [EPISODE_1, EPISODE_2]);

		// Assert
		expect(setItemSpy).toHaveBeenCalledWith('episode_podcast_1_limit_10', JSON.stringify(expectedCacheEntry));
		expect(setItemSpy).toHaveBeenCalledTimes(1);
		expect(getItemSpy).not.toHaveBeenCalled();
		expect(removeItemSpy).not.toHaveBeenCalled();
	});
});
