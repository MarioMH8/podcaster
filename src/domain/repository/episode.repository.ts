import { SearchEpisodeCriteria } from '@domain/criteria';
import type Episode from '@domain/episode';

export default abstract class EpisodeRepository {
	abstract search(criteria: SearchEpisodeCriteria): Promise<Episode[]>;
}
