import { NestedRoutes, Spinner } from '@presentation/components';
import { usePodcast } from '@presentation/context';
import { PodcastDetail } from '@presentation/features';
import type { FC } from 'react';
import { lazy, Suspense } from 'react';
import { Route, Switch } from 'wouter';

import css from './podcast.module.css';

const Episode = lazy(() => import('@presentation/pages/episode'));
const EpisodeList = lazy(() => import('@presentation/pages/episode-list'));

interface PodcastProps {
	podcast: string;
}

const Podcast: FC<PodcastProps> = ({ podcast: podcastId }) => {
	const { isLoading, podcast } = usePodcast(podcastId);

	return (
		<div className={css.layout}>
			<div className={css.card}>
				{isLoading || !podcast ? <Spinner className={css.spinner} /> : <PodcastDetail podcast={podcast} />}
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
