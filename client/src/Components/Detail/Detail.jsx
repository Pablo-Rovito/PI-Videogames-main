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
	}, []);

	const game = useSelector((state) => state?.videogame);
	const allGames = useSelector((state) => state?.allVideogames);

	console.log(game);

	if (allGames.length > 0) {
		var [{ short_screenshots }] = allGames?.filter(
			(g) => g.apiId === parseInt(match.params.id)
		);
	} else {
		var short_screenshots = game.short_screenshots;
	}

	const {
		genres,
		name,
		platforms,
		rating,
		description,
		released,
		screenshots = short_screenshots,
	} = game;

	return (
		<div className={asset.global}>
			<div className={styles.container}>
				<div className={styles.title}>
					<h1>{name}</h1>
				</div>

				<div className={styles.slider}>
					<Slider images={screenshots} />
				</div>
				<div className={styles.genres}>
					<h4>Genres</h4>
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
					<h4>Platforms</h4>
					<div style={{ color: '#ecb365' }}>
						{platforms?.map((p, i) => {
							return i === platforms.length - 1 ? (
								<span key={p.id}>{` ${p} `}</span>
							) : (
								<span key={p.id}>{` ${p} |`}</span>
							);
						})}
					</div>
				</div>
				<div
					className={styles.description}
					dangerouslySetInnerHTML={{ __html: description }}
				/>
				<div className={styles.rating}>Rating: {rating}</div>
				<div className={styles.released}>Released in {released}</div>
			</div>
		</div>
	);
}
