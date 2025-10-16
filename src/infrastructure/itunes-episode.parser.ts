import { Episode } from '@domain';
import { z } from 'zod';

const EpisodeSchema = z.object({
	description: z.string().nullish(),
	episodeUrl: z.url().nullish(),
	releaseDate: z.coerce.date(),
	trackId: z.coerce.number(),
	trackName: z.string(),
	trackTimeMillis: z.coerce.number(),
	wrapperType: z.string(),
});

const EpisodeListSchema = z.object({
	results: z.array(EpisodeSchema),
});

const ProxyResponseSchema = z.object({
	contents: z.string(),
});

export default class ItunesEpisodeParser {
	parse(json: unknown): Episode[] {
		const { contents } = ProxyResponseSchema.parse(json);

		const parsed = EpisodeListSchema.parse(JSON.parse(contents));

		return parsed.results
			.filter(r => r.wrapperType === 'podcastEpisode')
			.map(
				entry =>
					new Episode({
						description: entry.description ?? '',
						duration: entry.trackTimeMillis,
						id: entry.trackId,
						publication: entry.releaseDate,
						title: entry.trackName,
						url: entry.episodeUrl ?? '',
					})
			);
	}
}
