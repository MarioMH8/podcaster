import { EpisodeSearcher, PodcastSearcher } from '@application';
import { EpisodeCacheRepository, EpisodeRepository, PodcastCacheRepository, PodcastRepository } from '@domain';
import {
	ItunesEpisodeParser,
	ITunesEpisodeRepository,
	ItunesPodcastParser,
	ITunesPodcastRepository,
	LocalStorageEpisodeCacheRepository,
	LocalStoragePodcastCacheRepository,
} from '@infrastructure';
import { Container } from 'inversify';

const CACHE_DURATION = 24 * 60 * 60 * 1000;

const container = new Container();

container.bind(ItunesEpisodeParser).toSelf();
container.bind(ItunesPodcastParser).toSelf();
container.bind(PodcastRepository).toDynamicValue(context => {
	const parser = context.container.get(ItunesPodcastParser);

	return new ITunesPodcastRepository(parser);
});
container.bind(EpisodeRepository).toDynamicValue(context => {
	const parser = context.container.get(ItunesEpisodeParser);

	return new ITunesEpisodeRepository(parser);
});
container
	.bind(PodcastCacheRepository)
	.toDynamicValue(() => new LocalStoragePodcastCacheRepository(CACHE_DURATION))
	.inSingletonScope();
container
	.bind(EpisodeCacheRepository)
	.toDynamicValue(() => new LocalStorageEpisodeCacheRepository(CACHE_DURATION))
	.inSingletonScope();
container.bind(PodcastSearcher).toDynamicValue(context => {
	const repository = context.container.get(PodcastRepository);
	const cacheRepository = context.container.get(PodcastCacheRepository);

	return new PodcastSearcher(repository, cacheRepository);
});
container.bind(EpisodeSearcher).toDynamicValue(context => {
	const repository = context.container.get(EpisodeRepository);
	const cacheRepository = context.container.get(EpisodeCacheRepository);

	return new EpisodeSearcher(repository, cacheRepository);
});

export default container;
