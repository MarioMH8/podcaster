import type { PodcastPrimitives } from '@domain';
import { Podcast, PodcastCacheRepository, SearchPodcastCriteria } from '@domain';

interface CacheEntry<Data> {
	data: Data;
	timestamp: number;
}

export default class LocalStoragePodcastCacheRepository extends PodcastCacheRepository {
	readonly #cacheDuration: number;

	constructor(cacheDuration: number) {
		super();
		this.#cacheDuration = cacheDuration;
	}

	search(criteria: SearchPodcastCriteria): Podcast[] {
		const key = this.getKey(criteria);
		const entryJson = localStorage.getItem(key);
		const entry: CacheEntry<PodcastPrimitives[]> | undefined = entryJson
			? (JSON.parse(entryJson) as CacheEntry<PodcastPrimitives[]>)
			: undefined;

		if (!entry) {
			return [];
		}

		const now = Date.now();

		if (now - entry.timestamp > this.#cacheDuration) {
			localStorage.removeItem(key);

			return [];
		}

		return entry.data.map(p => new Podcast(p));
	}

	upsert(criteria: SearchPodcastCriteria, podcasts: Podcast[]): void {
		const key = this.getKey(criteria);

		const now = Date.now();
		const entry: CacheEntry<PodcastPrimitives[]> = {
			data: podcasts.map(p => p.toPrimitives()),
			timestamp: now,
		};
		localStorage.setItem(key, JSON.stringify(entry));
	}

	private getKey(criteria: SearchPodcastCriteria): string {
		return `podcast_genre_${criteria.genre.value.toFixed(0)}_limit_${criteria.limit.value.toFixed(0)}`;
	}
}
