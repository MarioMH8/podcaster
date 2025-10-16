import { Input, Spinner } from '@presentation/components';
import { useTopPodcast } from '@presentation/context';
import { ErrorMessage, PodcastCard } from '@presentation/features';
import type { FC } from 'react';
import { Fragment } from 'react';
import { Link } from 'wouter';

import css from './home.module.css';

const Home: FC = () => {
	const { filter, isError, isLoading, podcasts, setFilter } = useTopPodcast();

	if (isLoading) {
		return <Spinner className={css.spinner} />;
	}

	if (isError) {
		return (
			<ErrorMessage>Hubo un error al cargar los podcasts. Por favor, intenta nuevamente más tarde.</ErrorMessage>
		);
	}

	return (
		<Fragment>
			<nav className={css.filter}>
				<span className={css.badge}>{podcasts.length}</span>
				<Input
					className={css.input}
					onChange={event => setFilter(event.target.value)}
					placeholder='Filter podcasts...'
					type='search'
					value={filter}
				/>
			</nav>
			<section className={css.grid}>
				{podcasts.map(podcast => (
					<Link
						key={podcast.id}
						to={`/podcast/${podcast.id.toFixed(0)}/`}>
						<PodcastCard podcast={podcast} />
					</Link>
				))}
			</section>
		</Fragment>
	);
};

Home.displayName = 'Home';

export default Home;
