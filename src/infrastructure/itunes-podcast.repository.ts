import type { SearchPodcastCriteria } from '@domain';
import { Podcast, PodcastRepository } from '@domain';

import type ItunesPodcastParser from './itunes-podcast.parser';

export default class ITunesPodcastRepository extends PodcastRepository {
	readonly #parser: ItunesPodcastParser;

	constructor(parser: ItunesPodcastParser) {
		super();
		this.#parser = parser;
	}

	async search(criteria: SearchPodcastCriteria): Promise<Podcast[]> {
		const ITUNES_URL = `https://itunes.apple.com/us/rss/toppodcasts/limit=${criteria.limit.value.toFixed(0)}/genre=${criteria.genre.value.toFixed(0)}/json`;
		const PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(ITUNES_URL)}`;

		const response = await fetch(PROXY_URL);

		if (!response.ok) {
			throw new Error(`ITunesPodcastRepository. Failed to fetch podcasts: ${response.statusText}`);
		}

		const json = (await response.json()) as unknown;

		return this.#parser.parse(json);
	}
}
