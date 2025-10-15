import { SearchPodcastCriteria } from '@domain/criteria';
import type Podcast from '@domain/podcast';

export default abstract class PodcastRepository {
	abstract search(criteria: SearchPodcastCriteria): Promise<Podcast[]>;
}
