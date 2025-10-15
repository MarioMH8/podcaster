import { Podcast, PodcastRepository, SearchPodcastCriteria } from '@domain';
import type { Mock } from 'vitest';
import { vi } from 'vitest';

export default class MockPodcastRepository extends PodcastRepository {
	readonly searchSpy: Mock<typeof PodcastRepository.prototype.search>;

	constructor() {
		super();
		this.searchSpy = vi.fn();
	}

	async search(criteria: SearchPodcastCriteria): Promise<Podcast[]> {
		return this.searchSpy(criteria);
	}
}
