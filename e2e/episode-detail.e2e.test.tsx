/* eslint-disable unicorn/prevent-abbreviations */
import server from '@mock/msw/node';
import Podcaster from '@presentation/podcaster';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

const TIMEOUT = 10_000;

describe('Podcaster', () => {
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

	it(
		'should navigate to episode detail',
		async () => {
			const link = await screen.findByRole('link', { name: /Song Exploder/i });

			expect(link).toBeInTheDocument();

			fireEvent.click(link);

			await waitFor(
				() => {
					const link = screen.queryAllByRole('link');
					const episodeLink = link.at(5);

					expect(episodeLink).toBeDefined();

					if (!episodeLink) {
						throw new Error('Episode link not found');
					}

					fireEvent.click(episodeLink);
				},
				{ timeout: TIMEOUT }
			);

			await waitFor(
				async () => {
					const audio = await screen.findByRole('audio');

					expect(audio).toBeInTheDocument();
				},
				{ timeout: TIMEOUT }
			);
		},
		TIMEOUT
	);
});
