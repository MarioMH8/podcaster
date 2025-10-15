import { PodcastSearcher, SearchPodcastQuery } from '@application';
import type { PodcastPrimitives } from '@domain';
import { useInjection } from 'inversify-react';
import { useEffect, useMemo, useState } from 'react';

import { usePodcasterContext } from './podcaster.context';

interface TopPodcastState {
	isError: boolean;
	isLoading: boolean;
	podcasts: PodcastPrimitives[];
}

export default function useTopPodcast(): TopPodcastState {
	const { isLoading, setLoading } = usePodcasterContext();
	const [isError, setIsError] = useState<boolean>(false);
	const [podcasts, setData] = useState<PodcastPrimitives[]>([]);
	const useCase = useInjection(PodcastSearcher);

	const fetchPodcasts = useMemo(() => {
		return async () => {
			setIsError(false);
			setLoading(true);
			try {
				const query = new SearchPodcastQuery({ genre: 1310, limit: 100 });
				const podcasts = await useCase.run(query);
				setData(podcasts.map(p => p.toPrimitives()));
			} catch {
				setIsError(true);
			} finally {
				setLoading(false);
			}
		};
	}, [useCase, setData, setLoading, setIsError]);

	useEffect(() => {
		void fetchPodcasts();
	}, [fetchPodcasts]);

	return {
		isError,
		isLoading,
		podcasts,
	};
}
