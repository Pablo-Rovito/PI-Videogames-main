import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Slider from '../Slider/Slider';

import styles from './Detail.module.css';
import asset from '../../Assets/forms.module.css';
import { searchById } from '../../Actions';

export default function Detail({ match }) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(searchById(match.params.id));
	}, [dispatch, match.params.id]);

	const game = useSelector((state) => state?.videogame);
	const allGames = useSelector((state) => state?.videogames);

	const [gameFromList] = allGames?.filter((g) => {
		if (g?.id?.length > 20) {
			return g?.id === match.params.id;
		}
		return (g.id) === parseInt(match.params.id);
	});

	const short_screenshots = gameFromList?.short_screenshots
		? gameFromList.short_screenshots
		: [];

	const {
		genres,
		name,
		platforms,
		rating,
		description,
		released,
		background_image,
	} = game;

	return (
		<div className={asset.global}>
			<div className={styles.container}>
				<div className={styles.title}>
					<h1>
						{name === 'Error'
							? "There's no game with that ID, try something else..."
							: name}
					</h1>
				</div>

				<div className={styles.slider}>
					{name !== 'Error' && (
						<Slider
							images={
								short_screenshots.length > 0
									? short_screenshots
									: background_image
							}
						/>
					)}
				</div>
				<div className={styles.genres}>
					{name !== 'Error' && <h4>Genres</h4>}
					<div style={{ color: '#ecb365' }}>
						{genres?.map((g, i) => {
							return i === genres.length - 1 ? (
								<span key={g.id}>{` ${g.name} `}</span>
							) : (
								<span key={g.id}>{` ${g.name} |`}</span>
							);
						})}
					</div>
				</div>

				<div className={styles.platforms}>
					{name !== 'Error' && <h4>Platforms</h4>}
					<div style={{ color: '#ecb365' }}>
						{platforms?.map((p, i) => {
							return i === platforms.length - 1 ? (
								<span key={p}>{` ${p} `}</span>
							) : (
								<span key={p}>{` ${p} |`}</span>
							);
						})}
					</div>
				</div>
				<div
					className={styles.description}
					dangerouslySetInnerHTML={{ __html: description }}
				/>
				{name !== 'Error' && (
					<div className={styles.rating}>Rating: {rating}</div>
				)}
				{name !== 'Error' && (
					<div className={styles.released}>
						Released in {released}
					</div>
				)}
			</div>
		</div>
	);
}
