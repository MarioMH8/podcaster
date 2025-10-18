import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

describe('NestedRoutes', () => {
	const useLocation = vi.fn();
	const useRouter = vi.fn();

	const renderComponent = async (base: string, children: ReactNode): Promise<ReturnType<typeof render>> => {
		const { NestedRoutes } = await import('@presentation/components');

		return render(<NestedRoutes base={base}>{children}</NestedRoutes>);
	};

	beforeAll(() => {
		vi.doMock<typeof import('wouter')>(import('wouter'), async original => {
			const implementation = await original();

			return {
				...implementation,
				useLocation,
				useRouter,
			};
		});
	});

	afterAll(() => {
		vi.resetAllMocks();
	});

	it('does not render children when parent location does not match nested base', async () => {
		useRouter.mockReturnValueOnce({ base: '/app' });
		useLocation.mockReturnValueOnce(['/app/other']);

		const { queryByText } = await renderComponent('/dashboard', <div>Child Component</div>);

		expect(queryByText('Child Component')).not.toBeInTheDocument();
	});

	it('renders children when parent location matches nested base', async () => {
		useRouter.mockReturnValueOnce({ base: '/app' });
		useLocation.mockReturnValueOnce(['/app/dashboard']);

		const { getByText } = await renderComponent('/dashboard', <div>Child Component</div>);

		expect(getByText('Child Component')).toBeInTheDocument();
	});
});
