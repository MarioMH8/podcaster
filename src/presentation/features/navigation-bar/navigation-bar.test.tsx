import { render, screen } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

describe('NavigationBar', () => {
	const renderComponent = async () => {
		const { NavigationBar } = await import('@presentation/features');
		render(<NavigationBar />);
	};

	const usePodcasterContext = vi.fn(() => ({ isLoading: false }));

	const mockUsePodcasterContext = (loading: boolean) => {
		usePodcasterContext.mockReturnValue({
			isLoading: loading,
		});
	};

	beforeAll(() => {
		vi.doMock('@presentation/context', () => {
			return {
				usePodcasterContext,
			};
		});
	});

	afterAll(() => {
		vi.resetAllMocks();
	});

	it('should render component', async () => {
		await renderComponent();
		const linkElements = screen.getAllByRole('link');
		expect(linkElements).toHaveLength(1);
		const linkElement = linkElements[0];
		expect(linkElement).toHaveAttribute('href', '/');
		expect(linkElement).toHaveTextContent('Podcaster');
	});

	it('should show loading spinner when isLoading is true', async () => {
		mockUsePodcasterContext(true);
		await renderComponent();
		const spinnerElement = screen.getByRole('status');
		expect(spinnerElement).toBeInTheDocument();
		expect(spinnerElement).toHaveAttribute('aria-valuetext', 'true');
	});

	it('should show loading spinner when isLoading is false', async () => {
		mockUsePodcasterContext(false);
		await renderComponent();
		const spinnerElement = screen.queryByRole('status');
		expect(spinnerElement).not.toBeInTheDocument();
	});
});
