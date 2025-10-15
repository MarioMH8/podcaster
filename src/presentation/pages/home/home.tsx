import { Input, Spinner } from '@presentation/components';
import { useTopPodcast } from '@presentation/context';
import ErrorMessage from '@presentation/features/error-message';
import type { FC } from 'react';
import { Fragment } from 'react';

import css from './home.module.css';

const Home: FC = () => {
	const { isError, isLoading, podcasts } = useTopPodcast();

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
					placeholder='Filter podcasts...'
					type='search'
				/>
			</nav>
		</Fragment>
	);
};

Home.displayName = 'Home';

export default Home;
