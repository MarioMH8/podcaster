import { Episode, EpisodeCacheRepository, EpisodeRepository, SearchEpisodeCriteria } from '@domain';

import type SearchEpisodeQuery from './search-episode.query';

export default class EpisodeSearcher {
	readonly #cache: EpisodeCacheRepository;
	readonly #repository: EpisodeRepository;

	constructor(repository: EpisodeRepository, cache: EpisodeCacheRepository) {
		this.#repository = repository;
		this.#cache = cache;
	}

	async run(query: SearchEpisodeQuery): Promise<Episode[]> {
		const criteria = new SearchEpisodeCriteria({
			limit: query.limit,
			podcast: query.podcast,
		});

		const episodeCache = await this.#cache.search(criteria);

		if (episodeCache.length > 0) {
			return episodeCache;
		}

		const recentEpisode = await this.#repository.search(criteria);

		await this.#cache.upsert(criteria, recentEpisode);

		return recentEpisode;
	}
}
