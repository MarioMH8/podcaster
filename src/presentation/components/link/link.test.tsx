import Link from '@presentation/components/link';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Link', () => {
	const className = '_link_ef51b7';

	it('renders with default class', () => {
		const { container } = render(<Link />);
		expect(container.firstChild).toHaveClass(className);
	});
	it('renders with default href when none is provided', () => {
		const { container } = render(<Link />);
		expect(container.querySelector('a')).toHaveAttribute('href', '/');
	});

	it('applies provided href correctly', () => {
		const { container } = render(<Link href='/custom-path' />);
		expect(container.querySelector('a')).toHaveAttribute('href', '/custom-path');
	});

	it('applies additional className when provided', () => {
		const { container } = render(<Link className='custom-class' />);
		expect(container.querySelector('a')).toHaveClass('custom-class');
	});

	it('does not include undefined or empty className', () => {
		const { container } = render(<Link className={undefined} />);
		expect(container.querySelector('a')).not.toHaveClass('undefined');
	});

	it('spreads additional props onto the anchor element', () => {
		const { container } = render(
			<Link
				data-test='test-data'
				id='test-id'
			/>
		);
		const anchor = container.querySelector('a');
		expect(anchor).toHaveAttribute('id', 'test-id');
		expect(anchor).toHaveAttribute('data-test', 'test-data');
	});

	it('renders correctly when no props are provided', () => {
		const { container } = render(<Link />);
		expect(container.querySelector('a')).toBeInTheDocument();
	});
});
