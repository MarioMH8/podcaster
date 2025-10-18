import { Podcast } from '@domain';
import { ItunesPodcastParser } from '@infrastructure';
import { describe, expect, it } from 'vitest';

describe('ItunesPodcastParser', () => {
	it('parses valid JSON with podcast data correctly', () => {
		const parser = new ItunesPodcastParser();
		const validJson = {
			contents: JSON.stringify({
				feed: {
					entry: [
						{
							id: { attributes: { 'im:id': '123' } },
							'im:artist': { label: 'Author Name' },
							'im:image': [
								{ label: 'https://example.com/image1.jpg' },
								{ label: 'https://example.com/image2.jpg' },
								{ label: 'https://example.com/image3.jpg' },
							],
							'im:name': { label: 'Podcast Name' },
							summary: { label: 'Podcast Description' },
						},
					],
				},
			}),
		};

		const podcasts = parser.parse(validJson);

		expect(podcasts).toHaveLength(1);
		expect(podcasts[0]).toBeInstanceOf(Podcast);
		expect(podcasts[0].toPrimitives()).toEqual({
			author: 'Author Name',
			description: 'Podcast Description',
			id: 123,
			image: 'https://example.com/image3.jpg',
			name: 'Podcast Name',
		});
	});

	it('throws an error when JSON does not match the expected schema', () => {
		const parser = new ItunesPodcastParser();
		const invalidJson = {
			contents: JSON.stringify({
				feed: {
					entry: [
						{
							invalidField: 'Invalid data',
						},
					],
				},
			}),
		};

		expect(() => parser.parse(invalidJson)).toThrow();
	});

	it('handles empty podcast entries gracefully', () => {
		const parser = new ItunesPodcastParser();
		const emptyEntriesJson = {
			contents: JSON.stringify({
				feed: {
					entry: [],
				},
			}),
		};

		const podcasts = parser.parse(emptyEntriesJson);

		expect(podcasts).toHaveLength(0);
	});

	it('uses fallback images when higher resolution images are unavailable', () => {
		const parser = new ItunesPodcastParser();
		const jsonWithFallbackImages = {
			contents: JSON.stringify({
				feed: {
					entry: [
						{
							id: { attributes: { 'im:id': '456' } },
							'im:artist': { label: 'Another Author' },
							'im:image': [
								{ label: 'https://example.com/image1.jpg' },
								{ label: 'https://example.com/image2.jpg' },
							],
							'im:name': { label: 'Another Podcast' },
							summary: { label: 'Another Description' },
						},
						{
							id: { attributes: { 'im:id': '456' } },
							'im:artist': { label: 'Another Author' },
							'im:image': [{ label: 'https://example.com/image1.jpg' }],
							'im:name': { label: 'Another Podcast' },
							summary: { label: 'Another Description' },
						},
					],
				},
			}),
		};

		const podcasts = parser.parse(jsonWithFallbackImages);

		expect(podcasts).toHaveLength(2);
		expect(podcasts[0]).toBeInstanceOf(Podcast);
		expect(podcasts[0].toPrimitives().image).toEqual('https://example.com/image2.jpg');
		expect(podcasts[1]).toBeInstanceOf(Podcast);
		expect(podcasts[1].toPrimitives().image).toEqual('https://example.com/image1.jpg');
	});
});
