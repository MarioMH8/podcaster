import { EpisodeSearcher, SearchEpisodeQuery } from '@application';
import type { EpisodePrimitives } from '@domain';
import { useInjection } from 'inversify-react';
import { useEffect, useMemo, useState } from 'react';

interface EpisodeListState {
	episodes: EpisodePrimitives[];
	isError: boolean;
	isLoading: boolean;
}

export type { EpisodeListState };

export default function useEpisodeList(podcastId: string): EpisodeListState {
	const [isLoading, setLoading] = useState<boolean>(true);
	const [isError, setIsError] = useState<boolean>(false);
	const [episodes, setEpisode] = useState<EpisodePrimitives[]>([]);
	const useCase = useInjection(EpisodeSearcher);

	const fetchEpisode = useMemo(() => {
		return async (podcastId: string) => {
			setIsError(false);
			setLoading(true);
			try {
				const query = new SearchEpisodeQuery({ limit: 20, podcast: Number(podcastId) });
				const episodes = await useCase.run(query);
				setEpisode(episodes.map(episode => episode.toPrimitives()));
			} catch (error) {
				console.error(error);
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
