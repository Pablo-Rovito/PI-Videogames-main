import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Detail.module.css';

export default function Detail({ match }) {
	const allGames = useSelector((state) => state?.videogames);

	const [
		{
			background_image,
			genres,
			name,
			platforms,
			rating,
			released,
			short_screenshots,
		},
	] = allGames.filter(
		(g) => g.name.toLowerCase() === match.params.name.toLowerCase()
	);

	return (
		<div className={styles.global}>
			<h5>{name}</h5>
			<div>
				<img
					src={background_image}
					alt=''
					width={'240px'}
					height={'auto'}
				/>
			</div>
			<div>
				{genres.map((g, i) => {
					return i === genres.length - 1
						? ` ${g.name} `
						: ` ${g.name} |`;
				})}
			</div>
			<div>
				{platforms.map((p, i) => {
					return i === platforms.length - 1
						? ` ${p.name} `
						: ` ${p.name} |`;
				})}
			</div>
			<div>{rating}</div>
			<div>{released}</div>
			<div>
				{short_screenshots.map((s) => {
					console.log(s);
					return <img key={s.id} src={s.image} alt='' />;
				})}
			</div>
		</div>
	);
}
