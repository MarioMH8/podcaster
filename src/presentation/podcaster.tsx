import { Main, Nav, Spinner } from '@presentation/components';
import type { FC } from 'react';
import { lazy, StrictMode, Suspense } from 'react';
import { Link, Route, Switch } from 'wouter';

import css from './podcaster.module.css';

const Home = lazy(() => import('@presentation/pages/home'));
const Podcast = lazy(() => import('@presentation/pages/podcast'));
const Episode = lazy(() => import('@presentation/pages/episode'));

const Podcaster: FC = () => {
	return (
		<StrictMode>
			<Nav>
				<Link to='/'>Podcaster</Link>
			</Nav>
			<Main>
				<Switch>
					<Route path='/podcast/:podcast'>
						{({ podcast }) => (
							<Suspense fallback={<Spinner className={css.loading} />}>
								<Podcast podcast={podcast} />
							</Suspense>
						)}
					</Route>
					<Route path='/podcast/:podcast/episode/:episode'>
						{({ episode, podcast }) => (
							<Suspense fallback={<Spinner className={css.loading} />}>
								<Episode
									episode={episode}
									podcast={podcast}
								/>
							</Suspense>
						)}
					</Route>
					<Route path='*'>
						<Suspense fallback={<Spinner className={css.loading} />}>
							<Home />
						</Suspense>
					</Route>
				</Switch>
			</Main>
		</StrictMode>
	);
};

Podcaster.displayName = 'Podcaster';

export default Podcaster;
