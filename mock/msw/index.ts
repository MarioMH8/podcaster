import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [
	// Top podcast
	http.get('https://api.allorigins.win/get', ({ request }) => {
		const urlString = new URL(request.url);
		const url = urlString.searchParams.get('url');

		if (url?.startsWith('https://itunes.apple.com/us/rss/toppodcasts')) {
			return HttpResponse.json(
				{
					contents: JSON.stringify({
						feed: {
							author: {
								name: {
									label: 'iTunes Store',
								},
								uri: {
									label: 'http://www.apple.com/itunes/',
								},
							},
							entry: [
								{
									category: {
										attributes: {
											'im:id': '1525',
											label: 'Music Interviews',
											scheme: 'https://podcasts.apple.com/us/genre/podcasts-music-music-interviews/id1525?uo=2',
											term: 'Music Interviews',
										},
									},
									id: {
										attributes: {
											'im:id': '1751194045',
										},
										label: 'https://podcasts.apple.com/us/podcast/tony-mantors-almost-live-nashville/id1751194045?uo=2',
									},
									'im:artist': {
										label: 'Tony Mantor',
									},
									'im:contentType': {
										attributes: {
											label: 'Podcast',
											term: 'Podcast',
										},
									},
									'im:image': [
										{
											attributes: {
												height: '55',
											},
											label: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/3e/e4/59/3ee459ec-ca6a-8963-06a4-360f3059876c/mza_2940575243774001153.jpg/55x55bb.png',
										},
										{
											attributes: {
												height: '60',
											},
											label: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/3e/e4/59/3ee459ec-ca6a-8963-06a4-360f3059876c/mza_2940575243774001153.jpg/60x60bb.png',
										},
										{
											attributes: {
												height: '170',
											},
											label: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/3e/e4/59/3ee459ec-ca6a-8963-06a4-360f3059876c/mza_2940575243774001153.jpg/170x170bb.png',
										},
									],
									'im:name': {
										label: `'Tony Mantor's : Almost Live..... Nashville'`,
									},
									'im:price': {
										attributes: {
											amount: '0',
											currency: 'USD',
										},
										label: 'Get',
									},
									'im:releaseDate': {
										attributes: {
											label: 'October 7, 2025',
										},
										label: '2025-10-07T15:00:00-07:00',
									},
									link: {
										attributes: {
											href: 'https://podcasts.apple.com/us/podcast/tony-mantors-almost-live-nashville/id1751194045?uo=2',
											rel: 'alternate',
											type: 'text/html',
										},
									},
									rights: {
										label: `'© 2025 Tony Mantor's : Almost Live..... Nashville'`,
									},
									summary: {
										label: 'Nashville based veteran music producer Tony Mantor’s Almost Live… Nashville podcast takes its listener on a journey through the business of music and entertainment. Following the success and popularity of his top-rated podcast on Autism & Mental Health awareness - Why Not Me? - Mantor hosts thought-provoking conversations and behind-the-scenes stories from various celebrity guests from the world of music, television and entertainment. With more than 30 years as an accomplished music producer based in Nashville, Mantor welcomes a worldly guest list of musicians, actors and entertainers who share their unique stories about the roles they’ve played in creating and sustaining what we know as popular American culture. Conversations and stories that also give a deeper understanding on what it takes to achieve success in the entertainment industry for aspiring entertainers who are currently pursuing their own dreams of being a star someday. Whether listening for the entertainment or storytelling factor alone, or for tips on how his guests faced their life’s challenges, Almost Live… Nashville will have a story for anyone who has been a fan of popular culture in music, movies and television over the last few decades.',
									},
									title: {
										label: `'Tony Mantor's : Almost Live..... Nashville - Tony Mantor'`,
									},
								},
								{
									category: {
										attributes: {
											'im:id': '1310',
											label: 'Music',
											scheme: 'https://podcasts.apple.com/us/genre/podcasts-music/id1310?uo=2',
											term: 'Music',
										},
									},
									id: {
										attributes: {
											'im:id': '1535809341',
										},
										label: 'https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=2',
									},
									'im:artist': {
										attributes: {
											href: 'https://podcasts.apple.com/us/artist/the-joe-budden-network/1535844019?uo=2',
										},
										label: 'The Joe Budden Network',
									},
									'im:contentType': {
										attributes: {
											label: 'Podcast',
											term: 'Podcast',
										},
									},
									'im:image': [
										{
											attributes: {
												height: '55',
											},
											label: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/55x55bb.png',
										},
										{
											attributes: {
												height: '60',
											},
											label: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/60x60bb.png',
										},
										{
											attributes: {
												height: '170',
											},
											label: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png',
										},
									],
									'im:name': {
										label: 'The Joe Budden Podcast',
									},
									'im:price': {
										attributes: {
											amount: '0',
											currency: 'USD',
										},
										label: 'Get',
									},
									'im:releaseDate': {
										attributes: {
											label: 'October 14, 2025',
										},
										label: '2025-10-14T19:48:00-07:00',
									},
									link: {
										attributes: {
											href: 'https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=2',
											rel: 'alternate',
											type: 'text/html',
										},
									},
									rights: {
										label: '© All rights reserved',
									},
									summary: {
										label: 'Tune into Joe Budden and his friends. Follow along the crazy adventures of these very random friends.',
									},
									title: {
										label: 'The Joe Budden Podcast - The Joe Budden Network',
									},
								},
							],
							icon: {
								label: 'http://itunes.apple.com/favicon.ico',
							},
							id: {
								label: 'https://itunes.apple.com/us/rss/toppodcasts/limit=2/genre=1310/json',
							},
							link: [
								{
									attributes: {
										href: 'https://podcasts.apple.com/WebObjects/MZStore.woa/wa/viewTop?cc=us&id=179537&popId=3',
										rel: 'alternate',
										type: 'text/html',
									},
								},
								{
									attributes: {
										href: 'https://itunes.apple.com/us/rss/toppodcasts/limit=2/genre=1310/json',
										rel: 'self',
									},
								},
							],
							rights: {
								label: 'Copyright 2008 Apple Inc.',
							},
							title: {
								label: 'iTunes Store: Top Podcasts in Music',
							},
							updated: {
								label: '2025-10-15T06:11:21-07:00',
							},
						},
					}),
				},
				{ status: 200 }
			);
		}

		return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
	}),
];

export default setupServer(...handlers);
