import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('main.tsx', () => {
	const rootRenderMock = vi.fn();

	beforeEach(() => {
		vi.doMock('react-dom/client', () => ({
			createRoot: () => ({ render: rootRenderMock }),
		}));
	});

	afterEach(() => {
		vi.resetModules();
		rootRenderMock.mockReset();
	});

	it('throws error when root element is not found', async () => {
		document.body.innerHTML = '<div id="not-root"></div>';
		await import('./main').catch((error: unknown) => {
			expect(error).toStrictEqual(new Error('Failed to find the root element'));
		});
		expect(rootRenderMock).not.toHaveBeenCalled();
	});
	it('renders Podcaster component when root element exists', async () => {
		document.body.innerHTML = '<div id="root"></div>';
		await import('./main').then(() => {
			expect(rootRenderMock).toHaveBeenCalledWith(expect.anything());
		});
	});
});
