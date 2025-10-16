import { EpisodeSearcher, SearchEpisodeQuery } from '@application';
import type { EpisodePrimitives } from '@domain';
import { useInjection } from 'inversify-react';
import { useEffect, useMemo, useState } from 'react';

import { usePodcasterContext } from './podcaster.context';

interface TopEpisodeState {
	episodes: EpisodePrimitives[];
	isError: boolean;
	isLoading: boolean;
}

export default function useEpisodeList(podcastId: string): TopEpisodeState {
	const { isLoading, setLoading } = usePodcasterContext();
	const [isError, setIsError] = useState<boolean>(false);
	const [episodes, setEpisode] = useState<EpisodePrimitives[]>([]);
	const useCase = useInjection(EpisodeSearcher);

	const fetchEpisode = useMemo(() => {
		return async (podcastId: string) => {
			setIsError(false);
			setLoading(true);
			try {
				const query = new SearchEpisodeQuery({ limit: 100, podcast: Number(podcastId) });
				const episodes = await useCase.run(query);
				setEpisode(episodes.map(episode => episode.toPrimitives()));
			} catch {
				setIsError(true);
			} finally {
				setLoading(false);
			}
		};
	}, [useCase, setEpisode, setLoading, setIsError]);

	useEffect(() => {
		void fetchEpisode(podcastId);
	}, [fetchEpisode, podcastId]);

	return {
		episodes,
		isError,
		isLoading,
	};
}
