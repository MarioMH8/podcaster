import { Episode } from '@domain';
import { ItunesEpisodeParser } from '@infrastructure';
import { describe, expect, it } from 'vitest';

describe('ItunesEpisodeParser', () => {
	it('parses valid JSON with podcast episodes correctly', () => {
		const parser = new ItunesEpisodeParser();
		const validJson = {
			contents: JSON.stringify({
				results: [
					{
						description: 'Episode description',
						episodeUrl: 'https://example.com/episode.mp3',
						releaseDate: '2023-01-01T00:00:00Z',
						trackId: 1,
						trackName: 'Episode 1',
						trackTimeMillis: 3_600_000,
						wrapperType: 'podcastEpisode',
					},
					{
						description: 'Episode description 2',
						episodeUrl: 'https://example.com/episode2.mp3',
						releaseDate: '2023-02-02T00:00:00Z',
						trackId: 2,
						trackName: 'Episode 2',
						trackTimeMillis: 3_600_000,
						wrapperType: 'podcastEpisode',
					},
					{
						releaseDate: '2023-02-02T00:00:00Z',
						trackId: 2,
						trackName: 'Episode 2',
						trackTimeMillis: 3_600_000,
						wrapperType: 'notPodcastEpisode',
					},
				],
			}),
		};

		const episodes = parser.parse(validJson);

		expect(episodes).toHaveLength(2);
		expect(episodes[0]).toBeInstanceOf(Episode);
		expect(episodes[0].toPrimitives()).toEqual({
			description: 'Episode description',
			duration: 3_600_000,
			id: 1,
			publication: new Date('2023-01-01T00:00:00Z'),
			title: 'Episode 1',
			url: 'https://example.com/episode.mp3',
		});
		expect(episodes[1]).toBeInstanceOf(Episode);
		expect(episodes[1].toPrimitives()).toEqual({
			description: 'Episode description 2',
			duration: 3_600_000,
			id: 2,
			publication: new Date('2023-02-02T00:00:00Z'),
			title: 'Episode 2',
			url: 'https://example.com/episode2.mp3',
		});
	});

	it('filters out non-podcastEpisode wrapper types', () => {
		const parser = new ItunesEpisodeParser();
		const jsonWithNonPodcastEpisodes = {
			contents: JSON.stringify({
				results: [
					{
						description: 'Non-podcast description',
						episodeUrl: 'https://example.com/non-podcast.mp3',
						releaseDate: '2023-01-01T00:00:00Z',
						trackId: 2,
						trackName: 'Non-podcast',
						trackTimeMillis: 1_800_000,
						wrapperType: 'musicTrack',
					},
				],
			}),
		};

		const episodes = parser.parse(jsonWithNonPodcastEpisodes);

		expect(episodes).toHaveLength(0);
	});

	it('throws an error when JSON does not match the expected schema', () => {
		const parser = new ItunesEpisodeParser();
		const invalidJson = {
			contents: JSON.stringify({
				results: [
					{
						invalidField: 'Invalid data',
					},
				],
			}),
		};

		expect(() => parser.parse(invalidJson)).toThrow();
	});

	it('handles empty results array gracefully', () => {
		const parser = new ItunesEpisodeParser();
		const emptyResultsJson = {
			contents: JSON.stringify({
				results: [],
			}),
		};

		const episodes = parser.parse(emptyResultsJson);

		expect(episodes).toHaveLength(0);
	});
});
