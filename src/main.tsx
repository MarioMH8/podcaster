import './main.css';

import Podcaster from '@presentation/podcaster';
import { createRoot } from 'react-dom/client';

const root = document.querySelector('#root');

if (!root) {
	throw new Error('Failed to find the root element');
}

/*
 * if (import.meta.env.DEV) {
 * 	const worker = await import('@mock/msw/browser');
 *
 * 	await worker.default.start();
 * }
 */

createRoot(root).render(<Podcaster />);
