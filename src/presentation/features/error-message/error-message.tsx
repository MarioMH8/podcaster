import type { FC, ReactNode } from 'react';

import css from './error-message.module.css';

interface ErrorMessageProps {
	children?: ReactNode;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ children }) => {
	return <span className={css.error}>{children}</span>;
};

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
