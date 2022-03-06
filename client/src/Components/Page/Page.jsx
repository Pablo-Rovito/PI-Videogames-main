import React from 'react';
import Card from '../Card/Card';
import styles from './Page.module.css';
import { useSelector } from 'react-redux';

export default function Page({ gamesInPage, loading }) {
	const gamesLoading = useSelector((state) => state.videogames);
	if (loading && !gamesLoading.length) return <h2>Loading...</h2>;
	return (
		<div className={styles.cardsContainer}>
			{gamesInPage.map(({ id, name, background_image }) => {
				return (
					<div key={id} className={styles.card}>
						<Card name={name} background_image={background_image} />
					</div>
				);
			})}
		</div>
	);
}
