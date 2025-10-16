import { Episode, Podcast } from '@domain';

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

const EPISODE_1 = new Episode({
	description: 'Description 1',
	duration: 123_213,
	id: 1,
	publication: new Date('2023-01-01T00:00:00Z'),
	title: 'Podcast 1',
	url: 'https://example.com/episode1.mp3',
});

const EPISODE_2 = new Episode({
	description: 'Description 2',
	duration: 3213,
	id: 2,
	publication: new Date('2023-01-01T00:00:00Z'),
	title: 'Podcast 2',
	url: 'https://example.com/episode2.mp3',
});

const EPISODE_3 = new Episode({
	description: 'Description 3',
	duration: 3213,
	id: 3,
	publication: new Date('2023-01-01T00:00:00Z'),
	title: 'Podcast 3',
	url: 'https://example.com/episode3.mp3',
});

const EPISODE_4 = new Episode({
	description: 'Description 4',
	duration: 3213,
	id: 4,
	publication: new Date('2023-01-01T00:00:00Z'),
	title: 'Podcast 4',
	url: 'https://example.com/episode4.mp3',
});

export { EPISODE_1, EPISODE_2, EPISODE_3, EPISODE_4, PODCAST_1, PODCAST_2, PODCAST_3, PODCAST_4 };
