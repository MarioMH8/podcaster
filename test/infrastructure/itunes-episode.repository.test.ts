import { SearchEpisodeCriteria } from '@domain';
import { ItunesEpisodeParser, ITunesEpisodeRepository } from '@infrastructure';
import server from '@mock/msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

describe('ItunesEpisodeRepository', () => {
	let repository: ITunesEpisodeRepository;
	let parser: ItunesEpisodeParser;
	beforeAll(() => {
		server.listen();
	});
	beforeEach(() => {
		parser = new ItunesEpisodeParser();
		repository = new ITunesEpisodeRepository(parser);
	});
	afterEach(() => {
		server.dispose();
	});
	afterAll(() => {
		server.close();
	});

	it('should fetch all episode successfully', async () => {
		const criteria = new SearchEpisodeCriteria({ limit: 10, podcast: 1 });

		const episode = await repository.search(criteria);

		expect(episode.map(p => p.toPrimitives())).toMatchSnapshot();
	});
});
