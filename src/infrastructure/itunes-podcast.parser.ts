import { Podcast } from '@domain';
import { z } from 'zod';

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

const ProxyResponseSchema = z.object({
	contents: z.string(),
});

export default class ItunesPodcastParser {
	parse(json: unknown): Podcast[] {
		const { contents } = ProxyResponseSchema.parse(json);

		const parsed = TopPodcastSchema.parse(JSON.parse(contents));

		return parsed.feed.entry.map(
			entry =>
				new Podcast({
					author: entry['im:artist'].label,
					description: entry.summary.label,
					id: entry.id.attributes['im:id'],
					image: entry['im:image'][2].label || entry['im:image'][1].label || entry['im:image'][0].label,
					name: entry['im:name'].label,
				})
		);
	}
}
