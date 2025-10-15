import type { ComponentPropsWithRef, FC } from 'react';

import css from './card.module.css';

const Card: FC<ComponentPropsWithRef<'div'>> = properties => {
	return (
		<div
			{...properties}
			className={[css.card, properties.className].filter(Boolean).join(' ')}
		/>
	);
};

Card.displayName = 'Card';

export default Card;
