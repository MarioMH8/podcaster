import { PODCAST_1 } from '@mock';
import { PodcastCard } from '@presentation/features';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

describe('PodcastCard', () => {
	const podcast = PODCAST_1.toPrimitives();

	const renderComponent = () => {
		render(<PodcastCard podcast={podcast} />);
	};

	beforeEach(() => {
		renderComponent();
	});

	it('should render component', () => {
		const image = screen.getByRole('img');
		const title = screen.getByRole('heading', { name: podcast.name });
		const author = screen.getByText(`Author: ${podcast.author}`);

		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', podcast.image);
		expect(title).toBeInTheDocument();
		expect(author).toBeInTheDocument();
	});
});
