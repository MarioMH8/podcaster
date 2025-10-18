/* eslint-disable unicorn/prevent-abbreviations */
import server from '@mock/msw/node';
import Podcaster from '@presentation/podcaster';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
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
		'should load list of podcast',
		async () => {
			await waitFor(
				async () => {
					const podcastLinks = await screen.findAllByTestId('podcast-link');

					expect(podcastLinks.length).toBe(100);
				},
				{ timeout: TIMEOUT }
			);
		},
		TIMEOUT
	);
});
