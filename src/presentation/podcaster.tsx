import { Main, Spinner } from '@presentation/components';
import { PodcasterProvider } from '@presentation/context';
import { NavigationBar } from '@presentation/features';
import type { FC } from 'react';
import { lazy, StrictMode, Suspense } from 'react';
import { Route, Switch } from 'wouter';

import css from './podcaster.module.css';

const Home = lazy(() => import('@presentation/pages/home'));
const Podcast = lazy(() => import('@presentation/pages/podcast'));
const Episode = lazy(() => import('@presentation/pages/episode'));

const Podcaster: FC = () => {
	return (
		<StrictMode>
			<PodcasterProvider>
				<NavigationBar />
				<Main>
					<Switch>
						<Route path='/podcast/:podcast'>
							{({ podcast }) => (
								<Suspense fallback={<Spinner className={css.fallback} />}>
									<Podcast podcast={podcast} />
								</Suspense>
							)}
						</Route>
						<Route path='/podcast/:podcast/episode/:episode'>
							{({ episode, podcast }) => (
								<Suspense fallback={<Spinner className={css.fallback} />}>
									<Episode
										episode={episode}
										podcast={podcast}
									/>
								</Suspense>
							)}
						</Route>
						<Route path='*'>
							<Suspense fallback={<Spinner className={css.fallback} />}>
								<Home />
							</Suspense>
						</Route>
					</Switch>
				</Main>
			</PodcasterProvider>
		</StrictMode>
	);
};

Podcaster.displayName = 'Podcaster';

export default Podcaster;
