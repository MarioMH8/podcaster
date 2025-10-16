import { Card } from '@presentation/components';
import type { FC } from 'react';

import css from './episode.module.css';

interface EpisodeProps {
	episode: string;
	podcast: string;
}

const Episode: FC<EpisodeProps> = () => {
	return (
		<Card>
			<h2>Episode title</h2>
			<p className={css.description}>
				Officia incididunt enim ad enim eu. Sit officia nulla commodo officia consectetur veniam est occaecat
				exercitation ipsum ex. Officia labore nisi incididunt sunt. Irure laborum eiusmod anim elit et ullamco
				duis veniam nostrud adipisicing consectetur esse labore velit est. Eu incididunt cupidatat nulla
				deserunt velit.
			</p>
		</Card>
	);
};

Episode.displayName = 'Episode';

export default Episode;
