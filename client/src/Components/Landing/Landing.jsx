import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, logOut } from '../../Actions';
import asset from '../../Assets/button.module.css';
import styles from './Landing.module.css';

export default function Landing(params) {
	useEffect(() => {
		dispatch(logOut());
	}, []);

	const dispatch = useDispatch();
	function navigateOnClick() {
		params.history.push('/home');
		dispatch(logIn());
	}

	return (
		<div className={styles.main}>
			<button className={asset.button} onClick={navigateOnClick}>
				LOG IN
			</button>
		</div>
	);
}
