import PodcastAuthor from './podcast-author';
import PodcastDescription from './podcast-description';
import PodcastId from './podcast-id';
import PodcastName from './podcast-name';

interface PodcastPrimitives {
	author: string;
	description: string;
	id: number;
	name: string;
}

class Podcast {
	readonly author: PodcastAuthor;
	readonly description: PodcastDescription;
	readonly id: PodcastId;
	readonly name: PodcastName;

	constructor(primitives: PodcastPrimitives) {
		this.author = new PodcastAuthor(primitives.author);
		this.description = new PodcastDescription(primitives.description);
		this.id = new PodcastId(primitives.id);
		this.name = new PodcastName(primitives.name);
	}

	toPrimitives(): PodcastPrimitives {
		return {
			author: this.author.value,
			description: this.description.value,
			id: this.id.value,
			name: this.name.value,
		};
	}
}

export { PodcastPrimitives };

export default Podcast;
