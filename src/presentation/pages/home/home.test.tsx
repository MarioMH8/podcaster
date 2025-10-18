import { PODCAST_1, PODCAST_2 } from '@mock';
import { render, waitFor } from '@testing-library/react';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

describe('Home', () => {
	const renderComponent = async (): Promise<ReturnType<typeof render>> => {
		const { default: Home } = await import('@presentation/pages/home');

		return render(<Home />);
	};

	const setLoading = vi.fn();
	const usePodcasterContext = vi.fn(() => ({ isLoading: false, setLoading }));
	const useTopPodcast = vi.fn();

	beforeAll(() => {
		vi.doMock('@presentation/context', () => {
			return {
				usePodcasterContext,
				useTopPodcast,
			};
		});
	});

	beforeEach(() => {
		setLoading.mockReset();
		usePodcasterContext.mockReset();
		useTopPodcast.mockReset();
	});

	afterAll(() => {
		vi.resetAllMocks();
	});

	it('should handle loading state', async () => {
		useTopPodcast.mockReturnValue({ episode: undefined, isError: false, isLoading: true });

		const { getByRole } = await renderComponent();

		expect(usePodcasterContext).toHaveBeenCalled();
		expect(useTopPodcast).toHaveBeenCalled();

		await waitFor(() => {
			expect(setLoading).toHaveBeenCalledWith(true);

			expect(getByRole('status')).toBeInTheDocument();
		});
	});

	it('should handle error state', async () => {
		useTopPodcast.mockReturnValue({ episode: undefined, isError: true, isLoading: false });

		const { getByText } = await renderComponent();

		expect(usePodcasterContext).toHaveBeenCalled();
		expect(useTopPodcast).toHaveBeenCalled();

		await waitFor(() => {
			expect(setLoading).toHaveBeenCalledWith(false);

			expect(
				getByText('Hubo un error al cargar los podcasts. Por favor, intenta nuevamente más tarde.')
			).toBeInTheDocument();
		});
	});

	it('should handle loaded state', async () => {
		useTopPodcast.mockReturnValue({
			isError: false,
			isLoading: false,
			podcasts: [PODCAST_1.toPrimitives(), PODCAST_2.toPrimitives()],
		});

		const { container, getByRole } = await renderComponent();

		expect(usePodcasterContext).toHaveBeenCalled();
		expect(useTopPodcast).toHaveBeenCalled();

		await waitFor(() => {
			expect(setLoading).toHaveBeenCalledWith(false);

			const nav = getByRole('menu');
			const badge = nav.querySelector('span');
			const input = nav.querySelector('input');
			const section = container.querySelector('section');

			expect(badge).toHaveTextContent('2');
			expect(input).toBeInTheDocument();

			expect(nav).toBeInTheDocument();

			expect(section).toBeInTheDocument();
			expect(section?.children).toHaveLength(2);

			const links = section?.querySelectorAll('a');
			expect(links?.[0]).toHaveAttribute('href', `/podcast/${PODCAST_1.id.value.toFixed(0)}/`);
			expect(links?.[1]).toHaveAttribute('href', `/podcast/${PODCAST_2.id.value.toFixed(0)}/`);
		});
	});
});
