import { Spinner } from '@presentation/components';
import { usePodcast } from '@presentation/context';
import { PodcastDetail } from '@presentation/features';
import type { FC } from 'react';

import css from './podcast.module.css';

interface PodcastProps {
	podcast: string;
}

const Podcast: FC<PodcastProps> = ({ podcast: podcastId }) => {
	const { isLoading, podcast } = usePodcast(podcastId);

	return (
		<div className={css.layout}>
			<div className={css.card}>
				{isLoading || !podcast ? <Spinner className={css.spinner} /> : <PodcastDetail podcast={podcast} />}
			</div>
			<div></div>
		</div>
	);
};

Podcast.displayName = 'Podcast';

export default Podcast;
