import type { PodcastPrimitives } from '@domain';
import { Card } from '@presentation/components';
import type { FC } from 'react';

import css from './podcast-card.module.css';

interface PodcastCardProps {
	podcast: PodcastPrimitives;
}

const PodcastCard: FC<PodcastCardProps> = ({ podcast }) => {
	return (
		<Card className={css.podcast}>
			<img
				alt={podcast.image}
				className={css.image}
				src={podcast.image}
			/>
			<h2 className={css.title}>{podcast.name}</h2>
			<p className={css.artist}>Artist: {podcast.author}</p>
		</Card>
	);
};

PodcastCard.displayName = 'PodcastCard';

export default PodcastCard;
