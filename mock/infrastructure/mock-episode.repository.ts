import { Episode, EpisodeRepository, SearchEpisodeCriteria } from '@domain';
import type { Mock } from 'vitest';
import { vi } from 'vitest';

export default class MockEpisodeRepository extends EpisodeRepository {
	readonly searchSpy: Mock<typeof EpisodeRepository.prototype.search>;

	constructor() {
		super();
		this.searchSpy = vi.fn();
	}

	async search(criteria: SearchEpisodeCriteria): Promise<Episode[]> {
		return this.searchSpy(criteria);
	}
}
