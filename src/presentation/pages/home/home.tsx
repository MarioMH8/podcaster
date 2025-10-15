import { Spinner } from '@presentation/components';
import { useTopPodcast } from '@presentation/context';
import ErrorMessage from '@presentation/features/error-message';
import type { FC } from 'react';
import { Fragment } from 'react';

import css from './home.module.css';

const Home: FC = () => {
	const { isError, isLoading } = useTopPodcast();

	if (isLoading) {
		return <Spinner className={css.spinner} />;
	}

	if (isError) {
		return (
			<ErrorMessage>Hubo un error al cargar los podcasts. Por favor, intenta nuevamente más tarde.</ErrorMessage>
		);
	}

	return <Fragment />;
};

Home.displayName = 'Home';

export default Home;
