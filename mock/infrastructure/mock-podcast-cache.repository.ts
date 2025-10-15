import { Podcast, PodcastCacheRepository, SearchPodcastCriteria } from '@domain';
import type { Mock } from 'vitest';
import { vi } from 'vitest';

export default class MockPodcastCacheRepository extends PodcastCacheRepository {
	readonly searchSpy: Mock<typeof PodcastCacheRepository.prototype.search>;
	readonly upsertSpy: Mock<typeof PodcastCacheRepository.prototype.upsert>;

	constructor() {
		super();
		this.searchSpy = vi.fn();
		this.upsertSpy = vi.fn();
	}

	search(criteria: SearchPodcastCriteria): Podcast[] | Promise<Podcast[]> {
		return this.searchSpy(criteria);
	}

	upsert(criteria: SearchPodcastCriteria, podcasts: Podcast[]): Promise<void> | void {
		return this.upsertSpy(criteria, podcasts);
	}
}
