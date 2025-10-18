import { EpisodeSearcher, PodcastSearcher } from '@application';
import container from '@container';
import { describe, expect, it } from 'vitest';

describe('Container', () => {
	it('should return use cases instances successfully', () => {
		expect(container).toBeDefined();

		const PodcastSearcherResolve = container.resolve(PodcastSearcher);
		expect(PodcastSearcherResolve).toBeInstanceOf(PodcastSearcher);

		const EpisodeSearcherResolve = container.resolve(EpisodeSearcher);
		expect(EpisodeSearcherResolve).toBeInstanceOf(EpisodeSearcher);
	});
});
