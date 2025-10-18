import { ErrorMessage } from '@presentation/features';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

describe('ErrorMessage', () => {
	const message = 'An error occurred while fetching the podcast data.';

	const renderComponent = () => {
		render(<ErrorMessage>{message}</ErrorMessage>);
	};

	beforeEach(() => {
		renderComponent();
	});

	it('should render component', () => {
		const titleElement = screen.getByText(message);
		expect(titleElement).toBeInTheDocument();
	});
});
