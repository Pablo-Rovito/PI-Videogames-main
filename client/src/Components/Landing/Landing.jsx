import React from 'react';

import asset from '../../Assets/forms.module.css';
import styles from './Landing.module.css';

export default function Landing(params) {
	function navigateOnClick(e) {
		e.preventDefault();
		params.history.push('/home');
	}

	return (
		<div className={styles.main}>
			<span className={styles.title}>VIDEOGAMES APP</span>
			<div className={styles.button}>
				<button
					onClick={(e) => navigateOnClick(e)}
					className={asset.superButton}>
					Enter
				</button>
			</div>
		</div>
	);
}
