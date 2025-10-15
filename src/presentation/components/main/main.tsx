import type { ComponentPropsWithRef, FC } from 'react';

import css from './main.module.css';

const Main: FC<ComponentPropsWithRef<'main'>> = ({ children, ...properties }) => {
	return (
		<main
			{...properties}
			className={[css.main, properties.className].filter(Boolean).join(' ')}>
			<div>{children}</div>
		</main>
	);
};

Main.displayName = 'Main';

export default Main;
