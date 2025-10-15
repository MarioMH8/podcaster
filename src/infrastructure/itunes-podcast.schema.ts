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

type Podcast = z.infer<typeof PodcastSchema>;

const FeedPodcastSchema = z.object({
	entry: z.array(PodcastSchema),
});

type FeedPodcast = z.infer<typeof FeedPodcastSchema>;

const TopPodcastSchema = z.object({
	feed: FeedPodcastSchema,
});

type TopPodcast = z.infer<typeof TopPodcastSchema>;

export type { FeedPodcast, Podcast, TopPodcast };
export { FeedPodcastSchema, PodcastSchema, TopPodcastSchema };
