import Card from '@presentation/components/card';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Card', () => {
	const className = '_card_5a51a3';

	it('renders with default class', () => {
		const { container } = render(<Card />);
		expect(container.firstChild).toHaveClass(className);
	});

	it('applies additional className when provided', () => {
		const { container } = render(<Card className='custom-class' />);
		expect(container.firstChild).toHaveClass(className);
		expect(container.firstChild).toHaveClass('custom-class');
	});

	it('does not include undefined or empty className', () => {
		const { container } = render(<Card className={undefined} />);
		expect(container.firstChild).toHaveClass(className);
		expect(container.firstChild).not.toHaveClass('undefined');
	});

	it('spreads additional props onto the div', () => {
		const { container } = render(
			<Card
				data-test='test-data'
				id='test-id'
			/>
		);
		expect(container.firstChild).toHaveAttribute('id', 'test-id');
		expect(container.firstChild).toHaveAttribute('data-test', 'test-data');
	});

	it('renders correctly when no props are provided', () => {
		const { container } = render(<Card />);
		expect(container.firstChild).toBeInTheDocument();
	});

	it('renders children correctly', () => {
		const { getByText } = render(<Card>Test Child</Card>);
		expect(getByText('Test Child')).toBeInTheDocument();
	});
});
