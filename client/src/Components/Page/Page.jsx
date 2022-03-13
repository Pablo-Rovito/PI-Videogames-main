import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import styles from './Page.module.css';

export default function Page() {
	const gamesInPage = useSelector((state) => state.videogames);

	return (
		<div className={styles.cardsContainer}>
			{gamesInPage
				.filter((game) => game.apiId)
				.map(({ apiId, name, background_image, genres }) => {
					return (
						<div key={apiId}>
							<Card
								apiId={apiId}
								name={name}
								background_image={background_image}
								genres={genres}
							/>
						</div>
					);
				})}
		</div>
	);
}
