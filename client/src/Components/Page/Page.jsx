import React from 'react';
import Card from '../Card/Card';
import styles from './Page.module.css';

export default function Page({ gamesInPage }) {
	return (
		<div className={styles.cardsContainer}>
			{gamesInPage
				.filter((game) => game.apiId || game.id)
				.map(({ id, apiId, name, background_image, genres }) => {
					return (
						<div key={apiId ? apiId : id}>
							<Card
								apiId={apiId ? apiId : id}
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
