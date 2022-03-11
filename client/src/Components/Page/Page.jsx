import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import styles from './Page.module.css';

export default function Page() {
	const gamesInPage = useSelector((state) => state.videogames);
	useEffect(() => console.log(gamesInPage), [gamesInPage]);
	return (
		<div className={styles.cardsContainer}>
			{gamesInPage.map(({ apiId, name, background_image, genres }) => {
				if (apiId) {
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
				}
			})}
		</div>
	);
}
