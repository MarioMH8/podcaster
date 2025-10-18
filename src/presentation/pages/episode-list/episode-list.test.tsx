import { EPISODE_1, EPISODE_2 } from '@mock';
import { render, waitFor } from '@testing-library/react';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

describe('EpisodeList', () => {
	const renderComponent = async (podcast: string): Promise<ReturnType<typeof render>> => {
		const { default: EpisodeList } = await import('@presentation/pages/episode-list');

		return render(<EpisodeList podcast={podcast} />);
	};

	const setLoading = vi.fn();
	const usePodcasterContext = vi.fn(() => ({ isLoading: false, setLoading }));
	const useEpisodeList = vi.fn();

	beforeAll(() => {
		vi.doMock('@presentation/context', () => {
			return {
				useEpisodeList,
				usePodcasterContext,
			};
		});
	});

	beforeEach(() => {
		setLoading.mockReset();
		usePodcasterContext.mockReset();
		useEpisodeList.mockReset();
	});

	afterAll(() => {
		vi.resetAllMocks();
	});

	it('should handle loading state', async () => {
		useEpisodeList.mockReturnValue({ episode: undefined, isError: false, isLoading: true });

		const { getByRole } = await renderComponent('1');

		expect(usePodcasterContext).toHaveBeenCalled();
		expect(useEpisodeList).toHaveBeenCalledWith('1');

		await waitFor(() => {
			expect(setLoading).toHaveBeenCalledWith(true);

			expect(getByRole('status')).toBeInTheDocument();
		});
	});

	it('should handle error state', async () => {
		useEpisodeList.mockReturnValue({ episode: undefined, isError: true, isLoading: false });

		const { getByText } = await renderComponent('3');

		expect(usePodcasterContext).toHaveBeenCalled();
		expect(useEpisodeList).toHaveBeenCalledWith('3');

		await waitFor(() => {
			expect(setLoading).toHaveBeenCalledWith(false);

			expect(
				getByText('Hubo un error al cargar la lista de episodios. Por favor, intenta nuevamente más tarde.')
			).toBeInTheDocument();
		});
	});

	it('should handle loaded state', async () => {
		useEpisodeList.mockReturnValue({
			episodes: [EPISODE_1.toPrimitives(), EPISODE_2.toPrimitives()],
			isError: false,
			isLoading: false,
		});

		const { getByRole, getByText } = await renderComponent('5');

		expect(usePodcasterContext).toHaveBeenCalled();
		expect(useEpisodeList).toHaveBeenCalledWith('5');

		await waitFor(() => {
			expect(setLoading).toHaveBeenCalledWith(false);

			const count = getByText('Episodes: 2');
			const rows = getByRole('table').querySelectorAll('tbody tr');

			expect(count).toBeInTheDocument();
			expect(rows.length).toBe(2);
			expect(rows[0].textContent).toContain(EPISODE_1.title.value);
			expect(rows[1].textContent).toContain(EPISODE_2.title.value);
		});
	});
});
