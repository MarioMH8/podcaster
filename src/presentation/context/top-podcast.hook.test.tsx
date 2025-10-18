import { SearchPodcastQuery } from '@application';
import { PODCAST_1, PODCAST_2 } from '@mock';
import type { TopPodcastState } from '@presentation/context/top-podcast.hook';
import { renderHook, waitFor } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

describe('useTopPodcast', () => {
	const runUseCase = vi.fn();

	const renderComponent = async (): Promise<ReturnType<typeof renderHook<TopPodcastState, undefined>>> => {
		const { useTopPodcast } = await import('@presentation/context');

		return renderHook(() => useTopPodcast());
	};
	beforeAll(() => {
		const useInjection = vi.fn();
		useInjection.mockReturnValue({
			run: runUseCase,
		});
		vi.doMock('inversify-react', () => {
			return {
				useInjection,
			};
		});
	});

	afterEach(() => {
		runUseCase.mockClear();
	});

	afterAll(() => {
		vi.resetAllMocks();
	});

	it('should load podcast successfully', async () => {
		runUseCase.mockResolvedValueOnce([PODCAST_1, PODCAST_2]);

		const { result } = await renderComponent();

		expect(result.current.isError).toBe(false);
		expect(result.current.isLoading).toBe(true);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(false);
			expect(result.current.filter).toBe('');
			expect(result.current.podcasts).toStrictEqual([PODCAST_1.toPrimitives(), PODCAST_2.toPrimitives()]);
			expect(runUseCase).toHaveBeenCalledTimes(1);
			expect(runUseCase).toHaveBeenCalledWith(new SearchPodcastQuery({ genre: 1310, limit: 100 }));
		});
	});

	it('should handle load podcast error', async () => {
		runUseCase.mockRejectedValueOnce(new Error('Failed to load'));

		const { result } = await renderComponent();

		expect(result.current.isError).toBe(false);
		expect(result.current.isLoading).toBe(true);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(true);
			expect(result.current.filter).toBe('');
			expect(result.current.podcasts).toStrictEqual([]);
			expect(runUseCase).toHaveBeenCalledTimes(1);
			expect(runUseCase).toHaveBeenCalledWith(new SearchPodcastQuery({ genre: 1310, limit: 100 }));
		});
	});

	it('should filter podcast successfully', async () => {
		runUseCase.mockResolvedValueOnce([PODCAST_1, PODCAST_2]);

		const { result } = await renderComponent();

		expect(result.current.isError).toBe(false);
		expect(result.current.isLoading).toBe(true);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(false);
			expect(result.current.filter).toBe('');
			expect(result.current.podcasts).toStrictEqual([PODCAST_1.toPrimitives(), PODCAST_2.toPrimitives()]);
			expect(runUseCase).toHaveBeenCalledTimes(1);
			expect(runUseCase).toHaveBeenCalledWith(new SearchPodcastQuery({ genre: 1310, limit: 100 }));
		});

		result.current.setFilter('Podcast 1');

		await waitFor(() => {
			expect(result.current.podcasts).toStrictEqual([PODCAST_1.toPrimitives()]);
			expect(result.current.filter).toBe('Podcast 1');
		});

		result.current.setFilter('thor 2');

		await waitFor(() => {
			expect(result.current.podcasts).toStrictEqual([PODCAST_2.toPrimitives()]);
			expect(result.current.filter).toBe('thor 2');
		});
	});
});
