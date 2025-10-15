import { Podcast, PodcastCacheRepository, PodcastRepository, SearchPodcastCriteria } from '@domain';

import type SearchPodcastQuery from './search-podcast.query';

export default class PodcastSearcher {
	readonly #cache: PodcastCacheRepository;
	readonly #repository: PodcastRepository;

	constructor(repository: PodcastRepository, cache: PodcastCacheRepository) {
		this.#repository = repository;
		this.#cache = cache;
	}

	async run(query: SearchPodcastQuery): Promise<Podcast[]> {
		const criteria = new SearchPodcastCriteria({
			genre: query.genre,
			limit: query.limit,
		});

		const podcastCache = await this.#cache.search(criteria);

		if (podcastCache.length > 0) {
			return podcastCache;
		}

		const recentPodcast = await this.#repository.search(criteria);

		await this.#cache.upsert(criteria, recentPodcast);

		return recentPodcast;
	}
}
