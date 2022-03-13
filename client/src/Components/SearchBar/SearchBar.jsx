import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName } from '../../Actions';
import styles from './SearchBar.module.css';
import asset from '../../Assets/forms.module.css';

export default function SearchBar() {
	const [byName, setByName] = useState(true);

	const dispatch = useDispatch();

	function handleStateChange(e) {
		e.preventDefault(e);
		setByName(!byName);
	}

	function handleOnSearch(e) {
		e.preventDefault();
		if (window.location.href === 'http://localhost:3000/home') {
			if (e.target[0].value === '') {
				alert('There is nothing to look for');
			} else {
				byName
					? dispatch(searchByName(e.target[0].value))
					: window.location.assign(
							`http://localhost:3000/detail/${e.target[0].value}`
					  );
			}
		} else {
			alert('The search must be done from homepage');
		}
	}

	return (
		<form className={styles.searchBar} onSubmit={(e) => handleOnSearch(e)}>
			<div className={styles.top}>
				<input className={asset.input} placeholder='Search input...' />
			</div>

			<div className={styles.bottom}>
				<button
					style={{ width: '8em' }}
					className={asset.button}
					type='submit'>
					Search by...
				</button>
				<button
					className={asset.button_select}
					onClick={(e) => handleStateChange(e)}>
					{byName ? 'Name' : 'ID'}
				</button>
			</div>
		</form>
	);
}
