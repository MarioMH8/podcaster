import { SearchPodcastCriteria } from '@domain';
import { ItunesPodcastParser, ITunesPodcastRepository } from '@infrastructure';
import server from '@mock/msw/node';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

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
	afterAll(() => {
		server.close();
	});

	it('should fetch all podcast successfully', async () => {
		const criteria = new SearchPodcastCriteria({ genre: 1, limit: 10 });

		const podcast = await repository.search(criteria);

		expect(podcast.map(p => p.toPrimitives())).toMatchSnapshot();
	});

	it('should throw an error if response is not ok', async () => {
		const criteria = new SearchPodcastCriteria({ genre: 9999, limit: 100 });

		await expect(repository.search(criteria)).rejects.toThrowError();
	});
});
