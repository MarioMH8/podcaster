import { SearchEpisodeCriteria } from '@domain';
import { ItunesEpisodeParser, ITunesEpisodeRepository } from '@infrastructure';
import server from '@mock/msw/node';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

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
	afterAll(() => {
		server.close();
	});

	it('should fetch all episode successfully', async () => {
		const criteria = new SearchEpisodeCriteria({ limit: 10, podcast: 1 });

		const episode = await repository.search(criteria);

		expect(episode.map(p => p.toPrimitives())).toMatchSnapshot();
	});

	it('should throw an error if response is not ok', async () => {
		const criteria = new SearchEpisodeCriteria({ limit: 20, podcast: 9999 });

		await expect(repository.search(criteria)).rejects.toThrowError();
	});
});
