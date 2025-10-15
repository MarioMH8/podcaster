import type { ComponentPropsWithRef, FC } from 'react';

import css from './spinner.module.css';

const Spinner: FC<ComponentPropsWithRef<'svg'>> = properties => {
	return (
		<svg
			{...properties}
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'>
			<path
				className={css.spinner}
				d='M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z'
				transform='translate(12, 12) scale(0)'
			/>
			<path
				className={[css.spinner, css.delay_1].join(' ')}
				d='M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z'
				transform='translate(12, 12) scale(0)'
			/>
			<path
				className={[css.spinner, css.delay_2].join(' ')}
				d='M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z'
				transform='translate(12, 12) scale(0)'
			/>
		</svg>
	);
};

Spinner.displayName = 'Spinner';

export default Spinner;
