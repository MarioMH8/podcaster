import type { SearchPodcastCriteria } from '@domain';
import { Podcast, PodcastRepository } from '@domain';
import type { ZodFetcher } from 'zod-fetch';
import { createZodFetcher } from 'zod-fetch';

import type { TopPodcast } from './itunes-podcast.schema';
import { TopPodcastSchema } from './itunes-podcast.schema';

export default class ITunesPodcastRepository extends PodcastRepository {
	readonly #fetcher: ZodFetcher<typeof fetch>;

	constructor() {
		super();
		this.#fetcher = createZodFetcher();
	}

	async search(criteria: SearchPodcastCriteria): Promise<Podcast[]> {
		const ITUNES_URL = `https://itunes.apple.com/us/rss/toppodcasts/limit=${criteria.limit.value.toFixed(0)}/genre=${criteria.genre.value.toFixed(0)}/json`;
		const PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(ITUNES_URL)}`;

		const response = await this.#fetcher(TopPodcastSchema, PROXY_URL);

		return this.parseResponse(response);
	}

	private parseResponse(json: TopPodcast): Podcast[] {
		return json.feed.entry.map(
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
