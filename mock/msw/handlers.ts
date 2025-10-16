import { http, HttpResponse } from 'msw';

import episodes from './episodes.json';
import podcast from './podcast.json';

export const handlers = [
	// Top podcast
	http.get('https://api.allorigins.win/get', ({ request }) => {
		const urlString = new URL(request.url);
		const url = urlString.searchParams.get('url');

		if (url?.startsWith('https://itunes.apple.com/us/rss/toppodcasts')) {
			return HttpResponse.json(
				{
					contents: JSON.stringify(podcast),
				},
				{ status: 200 }
			);
		}

		if (url?.startsWith('https://itunes.apple.com/lookup?id=')) {
			return HttpResponse.json(
				{
					contents: JSON.stringify(episodes),
				},
				{ status: 200 }
			);
		}

		return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
	}),
];

export default handlers;
