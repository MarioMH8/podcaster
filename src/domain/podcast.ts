import PodcastAuthor from './podcast-author';
import PodcastDescription from './podcast-description';
import PodcastId from './podcast-id';
import PodcastImage from './podcast-image';
import PodcastName from './podcast-name';

interface PodcastPrimitives {
	author: string;
	description: string;
	id: number;
	image: string;
	name: string;
}

class Podcast {
	readonly author: PodcastAuthor;
	readonly description: PodcastDescription;
	readonly id: PodcastId;
	readonly image: PodcastImage;
	readonly name: PodcastName;

	constructor(primitives: PodcastPrimitives) {
		this.author = new PodcastAuthor(primitives.author);
		this.description = new PodcastDescription(primitives.description);
		this.id = new PodcastId(primitives.id);
		this.name = new PodcastName(primitives.name);
		this.image = new PodcastImage(primitives.image);
	}

	toPrimitives(): PodcastPrimitives {
		return {
			author: this.author.value,
			description: this.description.value,
			id: this.id.value,
			image: this.image.value,
			name: this.name.value,
		};
	}
}

export type { PodcastPrimitives };

export default Podcast;
