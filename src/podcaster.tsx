import type { FC } from 'react';
import { lazy, StrictMode } from 'react';
import { Route, Switch } from 'wouter';

const Podcaster: FC = () => {
	const Index = lazy(() => import('./pages'));
	const Podcast = lazy(() => import('./pages/podcast.tsx'));
	const Episode = lazy(() => import('./pages/episode.tsx'));

	return (
		<StrictMode>
			<Switch>
				<Route path='/podcast/:podcast'>{({ podcast }) => <Podcast podcast={podcast} />}</Route>
				<Route path='/podcast/:podcast/episode/:episode'>
					{({ episode, podcast }) => (
						<Episode
							episode={episode}
							podcast={podcast}
						/>
					)}
				</Route>
				<Route path='*'>{() => <Index />}</Route>
			</Switch>
		</StrictMode>
	);
};

Podcaster.displayName = 'Podcaster';

export default Podcaster;
