import { SearchPodcastQuery } from '@application';
import { PODCAST_1, PODCAST_2 } from '@mock';
import type { PodcastState } from '@presentation/context';
import { renderHook, waitFor } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

describe('usePodcast', () => {
	const runUseCase = vi.fn();

	const renderComponent = async (
		podcastId: string
	): Promise<ReturnType<typeof renderHook<PodcastState, undefined>>> => {
		const { usePodcast } = await import('@presentation/context');

		return renderHook(() => usePodcast(podcastId));
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

		const { result } = await renderComponent('1');

		expect(result.current.isError).toBe(false);
		expect(result.current.isLoading).toBe(true);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(false);
			expect(result.current.podcast).toStrictEqual(PODCAST_1.toPrimitives());
			expect(runUseCase).toHaveBeenCalledTimes(1);
			expect(runUseCase).toHaveBeenCalledWith(new SearchPodcastQuery({ genre: 1310, limit: 100 }));
		});
	});

	it('should handle load podcast error', async () => {
		runUseCase.mockRejectedValueOnce(new Error('Failed to load'));

		const { result } = await renderComponent('1');

		expect(result.current.isError).toBe(false);
		expect(result.current.isLoading).toBe(true);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(true);
			expect(result.current.podcast).toBeUndefined();
			expect(runUseCase).toHaveBeenCalledTimes(1);
			expect(runUseCase).toHaveBeenCalledWith(new SearchPodcastQuery({ genre: 1310, limit: 100 }));
		});
	});

	it('should not load unknown podcast', async () => {
		runUseCase.mockResolvedValueOnce([PODCAST_1, PODCAST_2]);

		const { result } = await renderComponent('5');

		expect(result.current.isError).toBe(false);
		expect(result.current.isLoading).toBe(true);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(false);
			expect(result.current.podcast).toBeUndefined();
			expect(runUseCase).toHaveBeenCalledTimes(1);
			expect(runUseCase).toHaveBeenCalledWith(new SearchPodcastQuery({ genre: 1310, limit: 100 }));
		});
	});
});
