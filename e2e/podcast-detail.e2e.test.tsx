/* eslint-disable unicorn/prevent-abbreviations */
import server from '@mock/msw/node';
import Podcaster from '@presentation/podcaster';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

describe.sequential('Podcaster', () => {
	beforeAll(() => {
		server.listen();
		render(<Podcaster />);
	});
	afterEach(() => {
		cleanup();
	});
	afterAll(() => {
		server.close();
	});

	it('should navigate to podcast detail', async () => {
		const link = await screen.findByRole('link', { name: /Song Exploder/i });

		expect(link).toBeInTheDocument();

		fireEvent.click(link);

		await waitFor(
			() => {
				const header = screen.getByRole('heading', { name: /Song Exploder/i });
				const description = screen.getByText(
					`Song Exploder is a podcast where musicians take apart their songs, and piece by piece, tell the story of how they were made. Each episode features an artist discussing a song of theirs, breaking down the sounds and ideas that went into the writing and recording. Hosted and produced by Hrishikesh Hirway.`
				);
				const rows = screen.getByRole('table').querySelectorAll('tbody tr');

				expect(header).toBeInTheDocument();
				expect(description).toBeInTheDocument();
				expect(rows).toHaveLength(20);
			},
			{ timeout: 3000 }
		);
	});
});
