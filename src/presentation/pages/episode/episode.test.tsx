import { EPISODE_1 } from '@mock';
import { render, waitFor } from '@testing-library/react';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

describe('Episode', () => {
	const renderComponent = async (podcast: string, episode: string): Promise<ReturnType<typeof render>> => {
		const { default: Episode } = await import('@presentation/pages/episode');

		return render(
			<Episode
				episode={episode}
				podcast={podcast}
			/>
		);
	};

	const setLoading = vi.fn();
	const usePodcasterContext = vi.fn(() => ({ isLoading: false, setLoading }));
	const useEpisode = vi.fn();

	beforeAll(() => {
		vi.doMock('@presentation/context', () => {
			return {
				useEpisode,
				usePodcasterContext,
			};
		});
	});

	beforeEach(() => {
		setLoading.mockReset();
		usePodcasterContext.mockReset();
		useEpisode.mockReset();
	});

	afterAll(() => {
		vi.resetAllMocks();
	});

	it('should handle loading state', async () => {
		useEpisode.mockReturnValue({ episode: undefined, isError: false, isLoading: true });

		const { getByRole } = await renderComponent('1', '2');

		expect(usePodcasterContext).toHaveBeenCalled();
		expect(useEpisode).toHaveBeenCalledWith('1', '2');

		await waitFor(() => {
			expect(setLoading).toHaveBeenCalledWith(true);

			expect(getByRole('status')).toBeInTheDocument();
		});
	});

	it('should handle error state', async () => {
		useEpisode.mockReturnValue({ episode: undefined, isError: true, isLoading: false });

		const { getByText } = await renderComponent('3', '4');

		expect(usePodcasterContext).toHaveBeenCalled();
		expect(useEpisode).toHaveBeenCalledWith('3', '4');

		await waitFor(() => {
			expect(setLoading).toHaveBeenCalledWith(false);

			expect(
				getByText('Hubo un error al cargar el episodio. Por favor, intenta nuevamente más tarde.')
			).toBeInTheDocument();
		});
	});

	it('should handle loaded state', async () => {
		useEpisode.mockReturnValue({ episode: EPISODE_1.toPrimitives(), isError: false, isLoading: false });

		const { getByRole, getByText } = await renderComponent('5', '6');

		expect(usePodcasterContext).toHaveBeenCalled();
		expect(useEpisode).toHaveBeenCalledWith('5', '6');

		await waitFor(() => {
			expect(setLoading).toHaveBeenCalledWith(false);

			const title = getByRole('heading', { name: EPISODE_1.title.value });
			const description = getByText(EPISODE_1.description.value);
			const audio = getByRole('audio');

			expect(title).toBeInTheDocument();
			expect(description).toBeInTheDocument();
			expect(audio).toBeInTheDocument();
		});
	});
});
