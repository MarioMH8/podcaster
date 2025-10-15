import { PodcastSearcher } from '@application';
import { PodcastCacheRepository, PodcastRepository } from '@domain';
import { ItunesPodcastParser, ITunesPodcastRepository, LocalStoragePodcastCacheRepository } from '@infrastructure';
import { Container } from 'inversify';

const CACHE_DURATION = 24 * 60 * 60 * 1000;

const container = new Container();

container.bind(ItunesPodcastParser).toSelf();
container.bind(PodcastRepository).toDynamicValue(context => {
	const parser = context.container.get(ItunesPodcastParser);

	return new ITunesPodcastRepository(parser);
});
container
	.bind(PodcastCacheRepository)
	.toDynamicValue(() => new LocalStoragePodcastCacheRepository(CACHE_DURATION))
	.inSingletonScope();
container.bind(PodcastSearcher).toDynamicValue(context => {
	const repository = context.container.get(PodcastRepository);
	const cacheRepository = context.container.get(PodcastCacheRepository);

	return new PodcastSearcher(repository, cacheRepository);
});

export default container;
