import type { ComponentPropsWithRef, FC } from 'react';
import { Link as WouterLink } from 'wouter';

import css from './link.module.css';

const Link: FC<ComponentPropsWithRef<'a'>> = ({ href = '/', ...properties }) => {
	return (
		<WouterLink
			asChild
			href={href}>
			<a
				{...properties}
				className={[css.link, properties.className].filter(Boolean).join(' ')}
			/>
		</WouterLink>
	);
};

Link.displayName = 'Link';

export default Link;
