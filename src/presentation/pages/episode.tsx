import type { FC } from 'react';
import { Fragment } from 'react';

interface EpisodeProps {
	episode: string;
	podcast: string;
}

const Episode: FC<EpisodeProps> = () => {
	return <Fragment />;
};

Episode.displayName = 'Episode';

export default Episode;
