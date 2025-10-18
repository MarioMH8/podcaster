import Nav from '@presentation/components/nav';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Nav', () => {
	const className = '_nav_be9d82';

	it('renders with default class', () => {
		const { container } = render(<Nav />);
		expect(container.firstChild).toHaveClass(className);
	});

	it('applies additional className when provided', () => {
		const { container } = render(<Nav className='custom-class' />);
		expect(container.firstChild).toHaveClass(className);
		const divChild = container.firstChild?.firstChild as HTMLElement;
		expect(divChild).toHaveClass('custom-class');
	});

	it('does not include undefined or empty className', () => {
		const { container } = render(<Nav className={undefined} />);
		expect(container.firstChild).toHaveClass(className);
		expect(container.firstChild).not.toHaveClass('undefined');
	});

	it('spreads additional props onto the div', () => {
		const { container } = render(
			<Nav
				data-test='test-data'
				id='test-id'
			/>
		);
		expect(container.firstChild).toHaveAttribute('id', 'test-id');
		expect(container.firstChild).toHaveAttribute('data-test', 'test-data');
	});

	it('renders correctly when no props are provided', () => {
		const { container } = render(<Nav />);
		expect(container.firstChild).toBeInTheDocument();
	});

	it('renders children correctly', () => {
		const { getByText } = render(<Nav>Test Child</Nav>);
		expect(getByText('Test Child')).toBeInTheDocument();
	});
});
