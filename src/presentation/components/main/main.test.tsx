import Main from '@presentation/components/main';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Main', () => {
	const className = '_main_444054';

	it('renders with default class', () => {
		const { container } = render(<Main />);
		expect(container.firstChild).toHaveClass(className);
	});

	it('applies additional className when provided', () => {
		const { container } = render(<Main className='custom-class' />);
		expect(container.firstChild).toHaveClass(className);
		expect(container.firstChild).toHaveClass('custom-class');
	});

	it('does not include undefined or empty className', () => {
		const { container } = render(<Main className={undefined} />);
		expect(container.firstChild).toHaveClass(className);
		expect(container.firstChild).not.toHaveClass('undefined');
	});

	it('spreads additional props onto the div', () => {
		const { container } = render(
			<Main
				data-test='test-data'
				id='test-id'
			/>
		);
		expect(container.firstChild).toHaveAttribute('id', 'test-id');
		expect(container.firstChild).toHaveAttribute('data-test', 'test-data');
	});

	it('renders correctly when no props are provided', () => {
		const { container } = render(<Main />);
		expect(container.firstChild).toBeInTheDocument();
	});

	it('renders children correctly', () => {
		const { getByText } = render(<Main>Test Child</Main>);
		expect(getByText('Test Child')).toBeInTheDocument();
	});
});
