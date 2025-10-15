import type { ComponentPropsWithRef, FC } from 'react';

import css from './spinner.module.css';

const Spinner: FC<ComponentPropsWithRef<'svg'>> = properties => {
	return (
		<svg
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'
			{...properties}>
			<circle
				className={css.spinner}
				cx='12'
				cy='12'
				r='0'
			/>
		</svg>
	);
};

Spinner.displayName = 'Spinner';

export default Spinner;
