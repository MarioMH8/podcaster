import type { ReactNode } from 'react';

export default function parseDescription(episode: string, description?: string): ReactNode {
	if (!description) {
		return '';
	}

	return description
		.split('\n')
		.map((line, index) => <p key={`episode-${episode}-line-${index.toFixed(0)}`}>{line}</p>);
}
