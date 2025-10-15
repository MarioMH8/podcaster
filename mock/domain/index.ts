import { Podcast } from '@domain';

const PODCAST_1 = new Podcast({
	author: 'Author 1',
	description: 'Description 1',
	id: 1,
	image: 'https://example.com/podcast1.jpg',
	name: 'Podcast 1',
});

const PODCAST_2 = new Podcast({
	author: 'Author 2',
	description: 'Description 2',
	id: 2,
	image: 'https://example.com/podcast2.jpg',
	name: 'Podcast 2',
});

const PODCAST_3 = new Podcast({
	author: 'Author 3',
	description: 'Description 3',
	id: 3,
	image: 'https://example.com/podcast3.jpg',
	name: 'Podcast 3',
});

const PODCAST_4 = new Podcast({
	author: 'Author 4',
	description: 'Description 4',
	id: 4,
	image: 'https://example.com/podcast4.jpg',
	name: 'Podcast 4',
});

export { PODCAST_1, PODCAST_2, PODCAST_3, PODCAST_4 };
