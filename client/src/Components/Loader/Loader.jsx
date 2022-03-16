import React from 'react';
import styles from './Loader.module.css';
import loading1 from '../../Assets/loading1.gif';
import loading2 from '../../Assets/loading2.gif';
import loading3 from '../../Assets/loading3.gif';
import loading4 from '../../Assets/loading4.gif';
import loading5 from '../../Assets/loading5.gif';

export default function Loader() {
	const images = [loading1, loading2, loading3, loading4, loading5];
	const randomizer = Math.floor(Math.random() * 5) % 5;
	return (
		<div className={styles.imageContainer}>
			<div className={styles.title}>
				<h3>Loading...</h3>
			</div>
			<div className={styles.image}>
				<img
					src={images[randomizer]}
					style={{ maxHeight: '6em' }}
					alt=''
				/>
			</div>
		</div>
	);
}
