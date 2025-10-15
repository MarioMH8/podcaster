interface SearchPodcastQueryPrimitives {
	genre: number;
	limit: number;
}

export default class SearchPodcastQuery {
	readonly genre: number;
	readonly limit: number;

	constructor(primitives: SearchPodcastQueryPrimitives) {
		this.genre = primitives.genre;
		this.limit = primitives.limit;
	}
}
