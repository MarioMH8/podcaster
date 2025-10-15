import { Spinner } from '@presentation/components';
import { useTopPodcast } from '@presentation/context';
import type { FC } from 'react';
import { Fragment } from 'react';

import css from './home.module.css';

const Home: FC = () => {
	const { isLoading } = useTopPodcast();

	if (isLoading) {
		return <Spinner className={css.spinner} />;
	}

	return <Fragment />;
};

Home.displayName = 'Home';

export default Home;
