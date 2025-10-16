import { Card, Link } from '@presentation/components';
import type { FC } from 'react';

import css from './episode-list.module.css';

interface EpisodeListProps {
	podcast: string;
}

const EpisodeList: FC<EpisodeListProps> = () => {
	return (
		<div className={css.layout}>
			<Card>
				<span className={css.episodeNumber}>Episodes: 66</span>
			</Card>
			<Card>
				<table className={css.table}>
					<thead>
						<tr className={css.row}>
							<th className={css.title}>Title</th>
							<th className={css.date}>Date</th>
							<th className={css.duration}>Duration</th>
						</tr>
					</thead>
					<tbody>
						<tr className={css.row}>
							<td>
								<Link href='/episode/1'>Episode 1</Link>
							</td>
							<td className={css.date}>2023-01-01</td>
							<td className={css.duration}>30:00</td>
						</tr>
					</tbody>
				</table>
			</Card>
		</div>
	);
};

EpisodeList.displayName = 'EpisodeList';

export default EpisodeList;
