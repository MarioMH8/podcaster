import type { PodcastPrimitives } from '@domain';
import { Card } from '@presentation/components';
import type { FC } from 'react';

import css from './podcast-detail.module.css';

interface PodcastCardProps {
	podcast: PodcastPrimitives;
}

const PodcastDetail: FC<PodcastCardProps> = ({ podcast }) => {
	return (
		<Card className={css.podcast}>
			<img
				alt={podcast.image}
				className={css.image}
				src={podcast.image}
			/>
			<hr className={css.separator} />
			<h2 className={css.title}>
				{podcast.name}
				<br />
				<span className={css.artist}>by {podcast.author}</span>
			</h2>
			<hr className={css.separator} />
			<p className={css.description}>{podcast.description}</p>
		</Card>
	);
};

PodcastDetail.displayName = 'PodcastDetail';

export default PodcastDetail;
