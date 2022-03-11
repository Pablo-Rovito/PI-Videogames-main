import React from 'react';
import Card from '../Card/Card';
import styles from './Page.module.css';
import { useSelector } from 'react-redux';

export default function Page({ gamesInPage, loading }) {
	const gamesLoading = useSelector((state) => state.videogames);

	if (gamesLoading === 'Error' || gamesLoading[0] === 'Error') {
		return (
			<div>
				There has been an error but it has been handled... keep
				navigating
			</div>
		);
	}
	if (gamesLoading[0]) {
		if (gamesLoading[0]?.status === 404) {
			return <div>Nothing found... try something else</div>;
		}
	}

	if (loading && !gamesLoading.length) return <h2>Loading...</h2>;

	return gamesInPage.length === 0 ? (
		<div>No game found</div>
	) : (
		<div className={styles.cardsContainer}>
			{gamesInPage?.map(({ apiId, name, background_image, genres }) => {
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
