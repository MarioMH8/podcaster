import type { ComponentPropsWithRef, FC } from 'react';

import css from './nav.module.css';

const Nav: FC<ComponentPropsWithRef<'nav'>> = ({ children, className, ...properties }) => {
	return (
		<nav
			{...properties}
			className={css.nav}>
			<div className={className}>{children}</div>
		</nav>
	);
};

Nav.displayName = 'Nav';

export default Nav;
