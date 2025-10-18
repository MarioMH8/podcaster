import { PODCAST_1 } from '@mock';
import { render, waitFor } from '@testing-library/react';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

describe('Podcast', () => {
	const renderComponent = async (podcast: string): Promise<ReturnType<typeof render>> => {
		const { default: Podcast } = await import('@presentation/pages/podcast');

		return render(<Podcast podcast={podcast} />);
	};

	const setLoading = vi.fn();
	const usePodcasterContext = vi.fn(() => ({ isLoading: false, setLoading }));
	const usePodcast = vi.fn();

	beforeAll(() => {
		vi.doMock('@presentation/context', () => {
			return {
				usePodcast,
				usePodcasterContext,
			};
		});
	});

	beforeEach(() => {
		setLoading.mockReset();
		usePodcasterContext.mockReset();
		usePodcast.mockReset();
	});

	afterAll(() => {
		vi.resetAllMocks();
	});

	it('should handle loading state', async () => {
		usePodcast.mockReturnValue({ episode: undefined, isError: false, isLoading: true });

		const { getByRole } = await renderComponent('1');

		expect(usePodcasterContext).toHaveBeenCalled();
		expect(usePodcast).toHaveBeenCalledWith('1');

		await waitFor(() => {
			expect(setLoading).toHaveBeenCalledWith(true);

			expect(getByRole('status')).toBeInTheDocument();
		});
	});

	it('should handle error state', async () => {
		usePodcast.mockReturnValue({ episode: undefined, isError: true, isLoading: false });

		const { getByText } = await renderComponent('2');

		expect(usePodcasterContext).toHaveBeenCalled();
		expect(usePodcast).toHaveBeenCalledWith('2');

		await waitFor(() => {
			expect(setLoading).toHaveBeenCalledWith(false);

			expect(
				getByText('Hubo un error al cargar el podcasts. Por favor, intenta nuevamente más tarde.')
			).toBeInTheDocument();
		});
	});

	it('should handle loaded state', async () => {
		usePodcast.mockReturnValue({
			isError: false,
			isLoading: false,
			podcast: PODCAST_1.toPrimitives(),
		});

		const { getByText } = await renderComponent('3');

		expect(usePodcasterContext).toHaveBeenCalled();
		expect(usePodcast).toHaveBeenCalledWith('3');

		await waitFor(() => {
			expect(setLoading).toHaveBeenCalledWith(false);
			const titleElement = getByText(PODCAST_1.name.value);

			expect(titleElement).toBeInTheDocument();
		});
	});
});
