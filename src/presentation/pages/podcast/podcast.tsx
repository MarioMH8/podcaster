import { NestedRoutes, Spinner } from '@presentation/components';
import { usePodcast, usePodcasterContext } from '@presentation/context';
import { ErrorMessage, PodcastDetail } from '@presentation/features';
import type { FC } from 'react';
import { lazy, Suspense, useEffect } from 'react';
import { Route, Switch } from 'wouter';

import css from './podcast.module.css';

const Episode = lazy(() => import('@presentation/pages/episode'));
const EpisodeList = lazy(() => import('@presentation/pages/episode-list'));

interface PodcastProps {
	podcast: string;
}

const Podcast: FC<PodcastProps> = ({ podcast: podcastId }) => {
	const { setLoading } = usePodcasterContext();
	const { isError, isLoading, podcast } = usePodcast(podcastId);

	useEffect(() => {
		setLoading(isLoading);
	}, [isLoading, setLoading]);

	if (isLoading) {
		return (
			<Spinner
				className={css.spinner}
				role='status'
			/>
		);
	}

	if (isError || !podcast) {
		return (
			<ErrorMessage>Hubo un error al cargar el podcasts. Por favor, intenta nuevamente más tarde.</ErrorMessage>
		);
	}

	return (
		<div className={css.layout}>
			<div className={css.card}>
				<PodcastDetail podcast={podcast} />
			</div>
			<div className={css.episodes}>
				<NestedRoutes base={`/podcast/${podcastId}`}>
					<Switch>
						<Route path='/episode/:episode'>
							{({ episode }) => (
								<Suspense>
									<Episode
										episode={episode}
										podcast={podcastId}
									/>
								</Suspense>
							)}
						</Route>
						<Route path='*'>
							<Suspense>
								<EpisodeList podcast={podcastId} />
							</Suspense>
						</Route>
					</Switch>
				</NestedRoutes>
			</div>
		</div>
	);
};

Podcast.displayName = 'Podcast';

export default Podcast;
