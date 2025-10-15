import SearchPodcastGenreCriteria from './search-podcast-genre.criteria';
import SearchPodcastLimitCriteria from './search-podcast-limit.criteria';

interface SearchPodcastLimitCriteriaPrimitives {
	genre: number;
	limit: number;
}

class SearchPodcastCriteria {
	readonly genre: SearchPodcastGenreCriteria;
	readonly limit: SearchPodcastLimitCriteria;

	constructor(primitives: SearchPodcastLimitCriteriaPrimitives) {
		this.genre = new SearchPodcastGenreCriteria(primitives.genre);
		this.limit = new SearchPodcastLimitCriteria(primitives.limit);
	}
}

export type { SearchPodcastLimitCriteriaPrimitives };

export default SearchPodcastCriteria;
