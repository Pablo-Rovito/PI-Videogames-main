import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import asset from '../../Assets/forms.module.css';

export default function Card({ apiId, name, background_image, genres }) {
	console.log(apiId);
	return (
		<div className={styles.card}>
			<div className={asset.title}>
				<Link to={`/detail/${apiId}`}>
					<h4>{decodeURIComponent(name)}</h4>
				</Link>
			</div>

			<div className={styles.image}>
				<img
					src={background_image}
					alt=''
					style={{ maxWidth: '19vw', maxHeight: '11vw' }}
				/>
			</div>

			<div className={styles.genres}>
				{genres?.map((g, i) => {
					return i === genres.length - 1
						? ` ${g.name} `
						: ` ${g.name} |`;
				})}
			</div>
		</div>
	);
}
