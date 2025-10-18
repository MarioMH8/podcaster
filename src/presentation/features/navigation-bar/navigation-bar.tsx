import { Link, Nav, Spinner } from '@presentation/components';
import { usePodcasterContext } from '@presentation/context';
import type { FC } from 'react';

import css from './navigation-bar.module.css';

const NavigationBar: FC = () => {
	const { isLoading } = usePodcasterContext();

	return (
		<Nav className={css.nav}>
			<Link
				className={css.title}
				href='/'>
				Podcaster
			</Link>
			{isLoading && (
				<Spinner
					aria-valuetext={isLoading.toString()}
					className={css.loading}
					role='status'
				/>
			)}
		</Nav>
	);
};

NavigationBar.displayName = 'NavigationBar';

export default NavigationBar;
