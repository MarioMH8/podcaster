import './main.css';

import Podcaster from '@app';
import { createRoot } from 'react-dom/client';

const root = document.querySelector('#root');

if (!root) {
	throw new Error('Failed to find the root element');
}

createRoot(root).render(<Podcaster />);
