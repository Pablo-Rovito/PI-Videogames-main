import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearGames, getGames } from '../../Actions';
import asset from '../../Assets/forms.module.css';
import styles from './Landing.module.css';

export default function Landing(params) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearGames());
		dispatch(getGames());
	}, [dispatch]);

	function navigateOnClick(e) {
		e.preventDefault();
		params.history.push('/home');
	}

	return (
		<div className={styles.main}>
			<button
				onClick={(e) => navigateOnClick(e)}
				className={asset.superButton}>
				Enter
			</button>
		</div>
	);
}
