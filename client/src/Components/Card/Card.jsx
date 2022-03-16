import React from 'react';

import { Link } from 'react-router-dom';

import styles from './Card.module.css';
import asset from '../../Assets/forms.module.css';
import img404 from '../../Assets/404.png';

export default function Card({ id, apiId, name, background_image, genres }) {
	const displayImage = background_image ? background_image : img404;

	return (
		<div className={styles.card}>
			<div className={asset.title}>
				<Link to={`/detail/${apiId ? apiId : id}`}>
					<h4>{decodeURIComponent(name).toUpperCase()}</h4>
				</Link>
			</div>

			<div className={styles.image}>
				<img
					src={displayImage}
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
