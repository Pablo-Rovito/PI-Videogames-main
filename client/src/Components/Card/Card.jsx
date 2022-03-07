import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

export default function Card({ name, background_image, genres }) {
	return (
		<div className={styles.card}>
			<Link to={`/detail/${name}`}>
				<h5>{name}</h5>
			</Link>
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
		</div>
	);
}
