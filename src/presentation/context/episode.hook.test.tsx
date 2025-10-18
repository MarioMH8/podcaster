import { SearchEpisodeQuery } from '@application';
import { EPISODE_1, EPISODE_2 } from '@mock';
import type { EpisodeState } from '@presentation/context';
import { renderHook, waitFor } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

describe('useEpisode', () => {
	const runUseCase = vi.fn();

	const renderComponent = async (
		podcastId: string,
		episodeId: string
	): Promise<ReturnType<typeof renderHook<EpisodeState, undefined>>> => {
		const { useEpisode } = await import('@presentation/context');

		return renderHook(() => useEpisode(podcastId, episodeId));
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
		runUseCase.mockResolvedValueOnce([EPISODE_1, EPISODE_2]);

		const { result } = await renderComponent('2', '1');

		expect(result.current.isError).toBe(false);
		expect(result.current.isLoading).toBe(true);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(false);
			expect(result.current.episode).toStrictEqual(EPISODE_1.toPrimitives());
			expect(runUseCase).toHaveBeenCalledTimes(1);
			expect(runUseCase).toHaveBeenCalledWith(new SearchEpisodeQuery({ limit: 20, podcast: 2 }));
		});
	});

	it('should handle load podcast error', async () => {
		runUseCase.mockRejectedValueOnce(new Error('Failed to load'));

		const { result } = await renderComponent('2', '1');

		expect(result.current.isError).toBe(false);
		expect(result.current.isLoading).toBe(true);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(true);
			expect(result.current.episode).toBeUndefined();
			expect(runUseCase).toHaveBeenCalledTimes(1);
			expect(runUseCase).toHaveBeenCalledWith(new SearchEpisodeQuery({ limit: 20, podcast: 2 }));
		});
	});

	it('should not load an unknown podcast', async () => {
		runUseCase.mockResolvedValueOnce([EPISODE_1, EPISODE_2]);

		const { result } = await renderComponent('2', '4');

		expect(result.current.isError).toBe(false);
		expect(result.current.isLoading).toBe(true);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(false);
			expect(result.current.episode).toBeUndefined();
			expect(runUseCase).toHaveBeenCalledTimes(1);
			expect(runUseCase).toHaveBeenCalledWith(new SearchEpisodeQuery({ limit: 20, podcast: 2 }));
		});
	});
});
