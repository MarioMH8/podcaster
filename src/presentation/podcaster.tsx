import container from '@container';
import { Main } from '@presentation/components';
import { PodcasterProvider } from '@presentation/context';
import { NavigationBar } from '@presentation/features';
import { Provider } from 'inversify-react';
import type { FC } from 'react';
import { lazy, StrictMode, Suspense } from 'react';
import { Route, Switch } from 'wouter';

const Home = lazy(() => import('@presentation/pages/home'));
const Podcast = lazy(() => import('@presentation/pages/podcast'));
const Episode = lazy(() => import('@presentation/pages/episode'));

const Podcaster: FC = () => {
	return (
		<StrictMode>
			<Provider container={container}>
				<PodcasterProvider>
					<NavigationBar />
					<Main>
						<Switch>
							<Route path='/podcast/:podcast'>
								{({ podcast }) => (
									<Suspense>
										<Podcast podcast={podcast} />
									</Suspense>
								)}
							</Route>
							<Route path='/podcast/:podcast/episode/:episode'>
								{({ episode, podcast }) => (
									<Suspense>
										<Episode
											episode={episode}
											podcast={podcast}
										/>
									</Suspense>
								)}
							</Route>
							<Route path='*'>
								<Suspense>
									<Home />
								</Suspense>
							</Route>
						</Switch>
					</Main>
				</PodcasterProvider>
			</Provider>
		</StrictMode>
	);
};

Podcaster.displayName = 'Podcaster';

export default Podcaster;
