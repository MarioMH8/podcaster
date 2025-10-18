import { PodcastSearcher, SearchPodcastQuery } from '@application';
import type { PodcastPrimitives } from '@domain';
import { useInjection } from 'inversify-react';
import { useEffect, useMemo, useState } from 'react';

interface PodcastState {
	isError: boolean;
	isLoading: boolean;
	podcast?: PodcastPrimitives | undefined;
}

export type { PodcastState };

export default function usePodcast(podcastId: string): PodcastState {
	const [isLoading, setLoading] = useState<boolean>(true);
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
			} catch (error) {
				console.error(error);
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
