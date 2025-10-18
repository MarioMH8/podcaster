import { PODCAST_1 } from '@mock';
import { PodcastDetail } from '@presentation/features';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

describe('PodcastDetail', () => {
	const podcast = PODCAST_1.toPrimitives();

	const renderComponent = () => {
		render(<PodcastDetail podcast={podcast} />);
	};

	beforeEach(() => {
		renderComponent();
	});

	it('should render component', () => {
		const image = screen.getByRole('img');
		const title = screen.getByRole('heading', { name: `${podcast.name}by ${podcast.author}` });
		const description = screen.getByText(podcast.description);

		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', podcast.image);
		expect(title).toBeInTheDocument();
		expect(description).toBeInTheDocument();
	});
});
