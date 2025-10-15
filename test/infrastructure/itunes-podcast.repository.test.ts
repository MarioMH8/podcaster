import { SearchPodcastCriteria } from '@domain';
import { ItunesPodcastParser, ITunesPodcastRepository } from '@infrastructure';
import server from '@mock/msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

describe('ItunesPodcastRepository', () => {
	let repository: ITunesPodcastRepository;
	let parser: ItunesPodcastParser;
	beforeAll(() => {
		server.listen();
	});
	beforeEach(() => {
		parser = new ItunesPodcastParser();
		repository = new ITunesPodcastRepository(parser);
	});
	afterEach(() => {
		server.dispose();
	});
	afterAll(() => {
		server.close();
	});

	it('should fetch all podcast successfully', async () => {
		const criteria = new SearchPodcastCriteria({ genre: 1, limit: 10 });

		const podcast = await repository.search(criteria);

		expect(podcast.map(p => p.toPrimitives())).toMatchSnapshot();
	});
});
