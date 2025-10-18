/* eslint-disable unicorn/no-null */
import { SearchPodcastCriteria } from '@domain';
import { LocalStoragePodcastCacheRepository } from '@infrastructure';
import { PODCAST_1, PODCAST_2 } from '@mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('LocalStoragePodcastCacheRepository', () => {
	let repository: LocalStoragePodcastCacheRepository;
	const CACHE_DURATION = 1000 * 60 * 5;
	// January 1, 2023 00:00:00 GMT
	const FAKE_TIMESTAMP = 1_672_531_200_000;
	let criteria: SearchPodcastCriteria;

	const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
	const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
	const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');

	beforeEach(() => {
		vi.useFakeTimers();
		localStorage.clear();
		getItemSpy.mockClear();
		setItemSpy.mockClear();
		removeItemSpy.mockClear();
		repository = new LocalStoragePodcastCacheRepository(CACHE_DURATION);
		criteria = new SearchPodcastCriteria({ genre: 1, limit: 10 });
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
		expect(getItemSpy).toHaveBeenCalledWith('podcast_genre_1_limit_10');
		expect(getItemSpy).toHaveBeenCalledTimes(1);
		expect(setItemSpy).not.toHaveBeenCalled();
		expect(removeItemSpy).not.toHaveBeenCalled();
	});

	it('should search returns empty array when data has expired', () => {
		// Arrange
		vi.setSystemTime(FAKE_TIMESTAMP);
		const cacheEntry = {
			data: [PODCAST_1, PODCAST_2].map(p => p.toPrimitives()),
			timestamp: FAKE_TIMESTAMP - CACHE_DURATION - 1000,
		};
		getItemSpy.mockReturnValueOnce(JSON.stringify(cacheEntry));

		// Act
		const result = repository.search(criteria);

		// Assert
		expect(result).toEqual([]);
		expect(getItemSpy).toHaveBeenCalledWith('podcast_genre_1_limit_10');
		expect(getItemSpy).toHaveBeenCalledTimes(1);
		expect(setItemSpy).not.toHaveBeenCalled();
		expect(removeItemSpy).toHaveBeenCalledWith('podcast_genre_1_limit_10');
	});

	it('should search returns data if data has not expired', () => {
		// Arrange
		vi.setSystemTime(FAKE_TIMESTAMP);
		const cacheEntry = {
			data: [PODCAST_1, PODCAST_2].map(p => p.toPrimitives()),
			timestamp: FAKE_TIMESTAMP - 1000,
		};
		getItemSpy.mockReturnValueOnce(JSON.stringify(cacheEntry));

		// Act
		const result = repository.search(criteria);

		// Assert
		expect(result).toStrictEqual([PODCAST_1, PODCAST_2]);
		expect(getItemSpy).toHaveBeenCalledWith('podcast_genre_1_limit_10');
		expect(setItemSpy).not.toHaveBeenCalled();
		expect(removeItemSpy).not.toHaveBeenCalled();
	});

	it('should update cache', () => {
		// Arrange
		vi.setSystemTime(FAKE_TIMESTAMP);
		const expectedCacheEntry = {
			data: [PODCAST_1, PODCAST_2].map(p => p.toPrimitives()),
			timestamp: FAKE_TIMESTAMP,
		};

		// Act
		repository.upsert(criteria, [PODCAST_1, PODCAST_2]);

		// Assert
		expect(setItemSpy).toHaveBeenCalledWith('podcast_genre_1_limit_10', JSON.stringify(expectedCacheEntry));
		expect(setItemSpy).toHaveBeenCalledTimes(1);
		expect(getItemSpy).not.toHaveBeenCalled();
		expect(removeItemSpy).not.toHaveBeenCalled();
	});
});
