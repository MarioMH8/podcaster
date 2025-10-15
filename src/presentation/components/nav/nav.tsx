import type { ComponentPropsWithRef, FC } from 'react';

import css from './nav.module.css';

const Nav: FC<ComponentPropsWithRef<'nav'>> = ({ children, ...properties }) => {
	return (
		<nav
			{...properties}
			className={css.nav}>
			<div className={properties.className}>{children}</div>
		</nav>
	);
};

Nav.displayName = 'Nav';

export default Nav;
