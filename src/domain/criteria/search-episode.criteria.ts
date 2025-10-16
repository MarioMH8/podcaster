import PodcastId from '../podcast-id';
import SearchEpisodeLimitCriteria from './search-episode-limit.criteria';

interface SearchEpisodeCriteriaPrimitives {
	limit: number;
	podcast: number;
}

class SearchEpisodeCriteria {
	readonly limit: SearchEpisodeLimitCriteria;
	readonly podcast: PodcastId;

	constructor(primitives: SearchEpisodeCriteriaPrimitives) {
		this.podcast = new PodcastId(primitives.podcast);
		this.limit = new SearchEpisodeLimitCriteria(primitives.limit);
	}
}

export type { SearchEpisodeCriteriaPrimitives };

export default SearchEpisodeCriteria;
