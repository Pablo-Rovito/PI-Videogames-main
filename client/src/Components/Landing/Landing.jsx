import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, logOut } from '../../Actions';
import asset from '../../Assets/forms.module.css';
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
			<form onSubmit={navigateOnClick}>
				<div>
					<input
						className={asset.input}
						placeholder='Username'></input>
				</div>
				<div>
					<input
						className={asset.input}
						placeholder='Password'></input>
				</div>
				<br />
				<button type='submit' className={asset.superButton}>
					LOG IN
				</button>
			</form>
		</div>
	);
}
