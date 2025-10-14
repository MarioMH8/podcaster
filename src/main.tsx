import './main.css';

import { createRoot } from 'react-dom/client';

import Podcaster from './podcaster.tsx';

const root = document.querySelector('#root');

if (!root) {
	throw new Error('Failed to find the root element');
}

createRoot(root).render(<Podcaster />);
