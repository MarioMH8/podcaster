interface SearchEpisodeQueryPrimitives {
	limit: number;
	podcast: number;
}

export default class SearchEpisodeQuery {
	readonly limit: number;
	readonly podcast: number;

	constructor(primitives: SearchEpisodeQueryPrimitives) {
		this.podcast = primitives.podcast;
		this.limit = primitives.limit;
	}
}
