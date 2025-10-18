import { Card, Spinner } from '@presentation/components';
import { useEpisode, usePodcasterContext } from '@presentation/context';
import { ErrorMessage } from '@presentation/features';
import { descriptionParser } from '@presentation/utils';
import type { FC } from 'react';
import { useEffect } from 'react';

import css from './episode.module.css';

interface EpisodeProps {
	episode: string;
	podcast: string;
}

const Episode: FC<EpisodeProps> = ({ episode: episodeId, podcast }) => {
	const { setLoading } = usePodcasterContext();
	const { episode, isError, isLoading } = useEpisode(podcast, episodeId);

	useEffect(() => {
		setLoading(isLoading);
	}, [isLoading, setLoading]);

	if (isLoading) {
		return (
			<Spinner
				className={css.spinner}
				role='status'
			/>
		);
	}

	if (isError || !episode) {
		return (
			<ErrorMessage>Hubo un error al cargar el episodio. Por favor, intenta nuevamente más tarde.</ErrorMessage>
		);
	}

	const description = descriptionParser(episodeId, episode.description);

	return (
		<Card>
			<h2>{episode.title}</h2>
			<div className={css.description}>{description}</div>
			<audio
				className={css.audio}
				controls
				role='audio'>
				<source
					src={episode.url}
					type='audio/mpeg'
				/>
				<track
					kind='captions'
					label='No captions available'
				/>
				Your browser does not support the audio element.
			</audio>
		</Card>
	);
};

Episode.displayName = 'Episode';

export default Episode;
