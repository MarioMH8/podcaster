import type { ComponentPropsWithRef, FC } from 'react';

import css from './input.module.css';

const Input: FC<ComponentPropsWithRef<'input'>> = properties => {
	return (
		<input
			{...properties}
			className={[css.input, properties.className].filter(Boolean).join(' ')}
		/>
	);
};

Input.displayName = 'Input';

export default Input;
