import { SearchPodcastCriteria } from '@domain/criteria';
import type Podcast from '@domain/podcast';

export default abstract class PodcastCacheRepository {
	abstract search(criteria: SearchPodcastCriteria): Podcast[] | Promise<Podcast[]>;

	abstract upsert(criteria: SearchPodcastCriteria, podcasts: Podcast[]): Promise<void> | void;
}
