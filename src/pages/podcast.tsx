import type { FC } from 'react';
import { Fragment } from 'react';

interface PodcastProps {
	podcast: string;
}

const Podcast: FC<PodcastProps> = () => {
	return <Fragment />;
};

Podcast.displayName = 'Podcast';

export default Podcast;
