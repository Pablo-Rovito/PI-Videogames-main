import React from 'react';
import Card from '../Card/Card';
import styles from './Page.module.css';

export default function Page({ gamesInPage }) {
	return (
		<div className={styles.cardsContainer}>
			{gamesInPage
				.filter((game) => game.id)
				.map(({ id, name, background_image, genres }) => {
					return (
						<div key={id}>
							<Card
								id={id}
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
