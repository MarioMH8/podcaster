import { http, HttpResponse } from 'msw';

import episodes from './episodes.json';
import podcast from './podcast.json';

export const handlers = [
	// Top podcast
	http.get('https://api.allorigins.win/get', ({ request }) => {
		const urlString = new URL(request.url);
		const url = urlString.searchParams.get('url');

		if (url === `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=9999/json`) {
			return HttpResponse.json({}, { status: 406 });
		}

		if (url?.startsWith('https://itunes.apple.com/us/rss/toppodcasts')) {
			return HttpResponse.json(
				{
					contents: JSON.stringify(podcast),
				},
				{ status: 200 }
			);
		}

		if (url === `https://itunes.apple.com/lookup?id=9999&media=podcast&entity=podcastEpisode&limit=20`) {
			return HttpResponse.json({}, { status: 406 });
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
