import { Episode, EpisodeCacheRepository, SearchEpisodeCriteria } from '@domain';
import type { Mock } from 'vitest';
import { vi } from 'vitest';

export default class MockEpisodeCacheRepository extends EpisodeCacheRepository {
	readonly searchSpy: Mock<typeof EpisodeCacheRepository.prototype.search>;
	readonly upsertSpy: Mock<typeof EpisodeCacheRepository.prototype.upsert>;

	constructor() {
		super();
		this.searchSpy = vi.fn();
		this.upsertSpy = vi.fn();
	}

	search(criteria: SearchEpisodeCriteria): Episode[] | Promise<Episode[]> {
		return this.searchSpy(criteria);
	}

	upsert(criteria: SearchEpisodeCriteria, episodes: Episode[]): Promise<void> | void {
		return this.upsertSpy(criteria, episodes);
	}
}
