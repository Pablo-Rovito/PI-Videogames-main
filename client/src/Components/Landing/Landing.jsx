import React, { useEffect } from 'react';
import { clearGames } from '../../Actions';
import { useDispatch } from 'react-redux';
import asset from '../../Assets/forms.module.css';
import styles from './Landing.module.css';

export default function Landing(params) {
	const dispatch = useDispatch();

	useEffect(() => dispatch(clearGames()), [dispatch]);

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
					className={asset.button}>
					Enter
				</button>
			</div>
		</div>
	);
}
