import { PodcastSearcher, SearchPodcastQuery } from '@application';
import type { PodcastPrimitives } from '@domain';
import { useInjection } from 'inversify-react';
import { useEffect, useMemo, useState } from 'react';

import { usePodcasterContext } from './podcaster.context';

interface TopPodcastState {
	isError: boolean;
	isLoading: boolean;
	podcast?: PodcastPrimitives | undefined;
}

export default function usePodcast(podcastId: string): TopPodcastState {
	const { isLoading, setLoading } = usePodcasterContext();
	const [isError, setIsError] = useState<boolean>(false);
	const [podcast, setPodcast] = useState<PodcastPrimitives | undefined>();
	const useCase = useInjection(PodcastSearcher);

	const fetchPodcast = useMemo(() => {
		return async (podcastId: string) => {
			setIsError(false);
			setLoading(true);
			try {
				const query = new SearchPodcastQuery({ genre: 1310, limit: 100 });
				const podcasts = await useCase.run(query);
				const podcast = podcasts.find(p => p.id.value === Number(podcastId));
				setPodcast(podcast?.toPrimitives());
			} catch {
				setIsError(true);
			} finally {
				setLoading(false);
			}
		};
	}, [useCase, setPodcast, setLoading, setIsError]);

	useEffect(() => {
		void fetchPodcast(podcastId);
	}, [fetchPodcast, podcastId]);

	return {
		isError,
		isLoading,
		podcast,
	};
}
