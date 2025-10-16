import { Card, Link, Spinner } from '@presentation/components';
import { useEpisodeList, usePodcasterContext } from '@presentation/context';
import { ErrorMessage } from '@presentation/features';
import { parseMillisecondToTime } from '@presentation/utils';
import type { FC } from 'react';
import { useEffect } from 'react';

import css from './episode-list.module.css';

interface EpisodeListProps {
	podcast: string;
}

const EpisodeList: FC<EpisodeListProps> = ({ podcast }) => {
	const { setLoading } = usePodcasterContext();
	const { episodes, isError, isLoading } = useEpisodeList(podcast);

	useEffect(() => {
		setLoading(isLoading);
	}, [isLoading, setLoading]);

	if (isLoading) {
		return <Spinner className={css.spinner} />;
	}

	if (isError) {
		return (
			<ErrorMessage>
				Hubo un error al cargar la lista de episodios. Por favor, intenta nuevamente más tarde.
			</ErrorMessage>
		);
	}

	return (
		<div className={css.layout}>
			<Card>
				<span className={css.episodeNumber}>Episodes: {episodes.length}</span>
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
						{episodes.map(episode => (
							<tr
								className={css.row}
								key={`episode-${episode.id.toFixed(0)}`}>
								<td>
									<Link href={`/episode/${episode.id.toFixed(0)}`}>{episode.title}</Link>
								</td>
								<td className={css.date}>{episode.publication.toLocaleDateString()}</td>
								<td className={css.duration}>{parseMillisecondToTime(episode.duration)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</Card>
		</div>
	);
};

EpisodeList.displayName = 'EpisodeList';

export default EpisodeList;
