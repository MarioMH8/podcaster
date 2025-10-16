import { SearchEpisodeCriteria } from '@domain/criteria';
import type Episode from '@domain/episode';

export default abstract class EpisodeCacheRepository {
	abstract search(criteria: SearchEpisodeCriteria): Episode[] | Promise<Episode[]>;

	abstract upsert(criteria: SearchEpisodeCriteria, episodes: Episode[]): Promise<void> | void;
}
