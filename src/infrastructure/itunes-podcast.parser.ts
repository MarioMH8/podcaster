import { Podcast } from '@domain';
import { z } from 'zod/mini';

const PodcastSchema = z.object({
	id: z.object({
		attributes: z.object({
			'im:id': z.coerce.number(),
		}),
	}),
	'im:artist': z.object({
		label: z.string(),
	}),
	'im:image': z.array(
		z.object({
			label: z.url(),
		})
	),
	'im:name': z.object({
		label: z.string(),
	}),
	summary: z.object({
		label: z.string(),
	}),
});

const FeedPodcastSchema = z.object({
	entry: z.array(PodcastSchema),
});

const TopPodcastSchema = z.object({
	feed: FeedPodcastSchema,
});

export default class ItunesPodcastParser {
	parse(json: unknown): Podcast[] {
		const parsed = TopPodcastSchema.parse(json);

		return parsed.feed.entry.map(
			entry =>
				new Podcast({
					author: entry['im:artist'].label,
					description: entry.summary.label,
					id: entry.id.attributes['im:id'],
					name: entry['im:name'].label,
				})
		);
	}
}
