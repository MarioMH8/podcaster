import { PodcastSearcher, SearchPodcastQuery } from '@application';
import type { PodcastPrimitives } from '@domain';
import { useInjection } from 'inversify-react';
import { useEffect, useMemo, useState } from 'react';

import { usePodcasterContext } from './podcaster.context';

interface TopPodcastState {
	isLoading: boolean;
	podcasts: PodcastPrimitives[];
}

export default function useTopPodcast(): TopPodcastState {
	const { isLoading, setLoading } = usePodcasterContext();
	const [podcasts, setData] = useState<PodcastPrimitives[]>([]);
	const useCase = useInjection(PodcastSearcher);

	const fetchPodcasts = useMemo(() => {
		return async () => {
			setLoading(true);
			try {
				const query = new SearchPodcastQuery({ genre: 1310, limit: 100 });
				const podcasts = await useCase.run(query);
				setData(podcasts.map(p => p.toPrimitives()));
			} finally {
				setLoading(false);
			}
		};
	}, [useCase, setData, setLoading]);

	useEffect(() => {
		void fetchPodcasts();
	}, [fetchPodcasts]);

	return {
		isLoading,
		podcasts,
	};
}
