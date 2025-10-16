import type { EpisodePrimitives } from '@domain';
import { Episode, EpisodeCacheRepository, SearchEpisodeCriteria } from '@domain';

interface CacheEntry<Data> {
	data: Data;
	timestamp: number;
}

export default class LocalStorageEpisodeCacheRepository extends EpisodeCacheRepository {
	readonly #cacheDuration: number;

	constructor(cacheDuration: number) {
		super();
		this.#cacheDuration = cacheDuration;
	}

	search(criteria: SearchEpisodeCriteria): Episode[] {
		const key = this.getKey(criteria);
		const entryJson = localStorage.getItem(key);
		const entry: CacheEntry<EpisodePrimitives[]> | undefined = entryJson
			? (JSON.parse(entryJson) as CacheEntry<EpisodePrimitives[]>)
			: undefined;

		if (!entry) {
			return [];
		}

		const now = Date.now();

		if (now - entry.timestamp > this.#cacheDuration) {
			localStorage.removeItem(key);

			return [];
		}

		return entry.data.map(p => new Episode(p));
	}

	upsert(criteria: SearchEpisodeCriteria, episodes: Episode[]): void {
		const key = this.getKey(criteria);

		const now = Date.now();
		const entry: CacheEntry<EpisodePrimitives[]> = {
			data: episodes.map(p => p.toPrimitives()),
			timestamp: now,
		};
		localStorage.setItem(key, JSON.stringify(entry));
	}

	private getKey(criteria: SearchEpisodeCriteria): string {
		return `episode_podcast_${criteria.podcast.value.toFixed(0)}_limit_${criteria.limit.value.toFixed(0)}`;
	}
}
