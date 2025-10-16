import EpisodeDescription from './episode-description';
import EpisodeDuration from './episode-duration';
import EpisodeId from './episode-id';
import EpisodePublication from './episode-publication';
import EpisodeTitle from './episode-title';
import EpisodeUrl from './episode-url';

interface EpisodePrimitives {
	description: string;
	duration: number;
	id: number;
	publication: Date;
	title: string;
	url: string;
}

class Episode {
	readonly description: EpisodeDescription;
	readonly duration: EpisodeDuration;
	readonly id: EpisodeId;
	readonly publication: EpisodePublication;
	readonly title: EpisodeTitle;
	readonly url: EpisodeUrl;

	constructor(primitives: EpisodePrimitives) {
		this.description = new EpisodeDescription(primitives.description);
		this.duration = new EpisodeDuration(primitives.duration);
		this.id = new EpisodeId(primitives.id);
		this.publication = new EpisodePublication(primitives.publication);
		this.title = new EpisodeTitle(primitives.title);
		this.url = new EpisodeUrl(primitives.url);
	}

	toPrimitives(): EpisodePrimitives {
		return {
			description: this.description.value,
			duration: this.duration.value,
			id: this.id.value,
			publication: this.publication.value,
			title: this.title.value,
			url: this.url.value,
		};
	}
}

export type { EpisodePrimitives };

export default Episode;
