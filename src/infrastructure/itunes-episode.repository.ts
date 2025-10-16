import type { SearchEpisodeCriteria } from '@domain';
import { Episode, EpisodeRepository } from '@domain';

import type ItunesEpisodeParser from './itunes-episode.parser';

export default class ITunesEpisodeRepository extends EpisodeRepository {
	readonly #parser: ItunesEpisodeParser;

	constructor(parser: ItunesEpisodeParser) {
		super();
		this.#parser = parser;
	}

	async search(criteria: SearchEpisodeCriteria): Promise<Episode[]> {
		const ITUNES_URL = `https://itunes.apple.com/lookup?id=${criteria.podcast.value.toFixed(0)}&media=podcast&entity=podcastEpisode&limit=${criteria.limit.value.toFixed(0)}`;
		const PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(ITUNES_URL)}`;

		const response = await fetch(PROXY_URL);

		if (!response.ok) {
			throw new Error(`ITunesEpisodeRepository. Failed to fetch episodes: ${response.statusText}`);
		}

		const json = (await response.json()) as unknown;

		return this.#parser.parse(json);
	}
}
