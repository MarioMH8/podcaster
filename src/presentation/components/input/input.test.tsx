import Input from '@presentation/components/input';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Input', () => {
	const className = '_input_9fdcf0';

	it('renders with default class', () => {
		const { container } = render(<Input />);
		expect(container.firstChild).toHaveClass(className);
	});

	it('applies additional className when provided', () => {
		const { container } = render(<Input className='custom-class' />);
		expect(container.firstChild).toHaveClass(className);
		expect(container.firstChild).toHaveClass('custom-class');
	});

	it('does not include undefined or empty className', () => {
		const { container } = render(<Input className={undefined} />);
		expect(container.firstChild).toHaveClass(className);
		expect(container.firstChild).not.toHaveClass('undefined');
	});

	it('spreads additional props onto the div', () => {
		const { container } = render(
			<Input
				data-test='test-data'
				id='test-id'
			/>
		);
		expect(container.firstChild).toHaveAttribute('id', 'test-id');
		expect(container.firstChild).toHaveAttribute('data-test', 'test-data');
	});

	it('renders correctly when no props are provided', () => {
		const { container } = render(<Input />);
		expect(container.firstChild).toBeInTheDocument();
	});
});
