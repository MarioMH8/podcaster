import { EpisodeSearcher, SearchEpisodeQuery } from '@application';
import type { EpisodePrimitives } from '@domain';
import { useInjection } from 'inversify-react';
import { useEffect, useMemo, useState } from 'react';

import { usePodcasterContext } from './podcaster.context';

interface TopEpisodeState {
	episode?: EpisodePrimitives | undefined;
	isError: boolean;
	isLoading: boolean;
}

export default function useEpisode(podcastId: string, episodeId: string): TopEpisodeState {
	const { isLoading, setLoading } = usePodcasterContext();
	const [isError, setIsError] = useState<boolean>(false);
	const [episode, setEpisode] = useState<EpisodePrimitives | undefined>();
	const useCase = useInjection(EpisodeSearcher);

	const fetchEpisode = useMemo(() => {
		return async (podcastId: string) => {
			setIsError(false);
			setLoading(true);
			try {
				const query = new SearchEpisodeQuery({ limit: 100, podcast: Number(podcastId) });
				const episodes = await useCase.run(query);
				const episode = episodes.find(episode => episode.id.value === Number(episodeId));
				setEpisode(episode?.toPrimitives());
			} catch {
				setIsError(true);
			} finally {
				setLoading(false);
			}
		};
	}, [useCase, setEpisode, setLoading, setIsError, episodeId]);

	useEffect(() => {
		void fetchEpisode(podcastId);
	}, [fetchEpisode, podcastId]);

	return {
		episode,
		isError,
		isLoading,
	};
}
