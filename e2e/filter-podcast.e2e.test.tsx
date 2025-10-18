/* eslint-disable unicorn/prevent-abbreviations */
import server from '@mock/msw/node';
import Podcaster from '@presentation/podcaster';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
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
		'should filter podcast',
		async () => {
			await waitFor(
				async () => {
					const input = await screen.findByPlaceholderText('Filter podcasts...');

					expect(input).toBeInTheDocument();

					await userEvent.type(input, 'New Rory');

					const podcastLinks = await screen.findAllByTestId('podcast-link');

					expect(podcastLinks.length).toBe(1);
				},
				{ timeout: TIMEOUT }
			);
		},
		TIMEOUT
	);
});
