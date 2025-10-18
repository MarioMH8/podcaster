import Spinner from '@presentation/components/spinner';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Spinner', () => {
	const className = '_spinner_b1b680';

	it('renders the spinner component with default properties', () => {
		const { container } = render(<Spinner />);
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	it('applies additional properties to the svg element', () => {
		const { container } = render(<Spinner data-testid='custom-spinner' />);
		expect(container.querySelector('svg')).toHaveAttribute('data-testid', 'custom-spinner');
	});

	it('renders the circle element with the correct class', () => {
		const { container } = render(<Spinner />);
		const circle = container.querySelector('circle');
		expect(circle).toBeInTheDocument();
		expect(circle).toHaveClass(className);
	});

	it('renders the circle element with default attributes', () => {
		const { container } = render(<Spinner />);
		const circle = container.querySelector('circle');
		expect(circle).toHaveAttribute('cx', '12');
		expect(circle).toHaveAttribute('cy', '12');
		expect(circle).toHaveAttribute('r', '0');
	});
});
