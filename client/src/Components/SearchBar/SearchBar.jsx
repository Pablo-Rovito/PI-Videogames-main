import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName, searchById } from '../../Actions';
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
		if (window.location.href !== 'http://localhost:3000/home') {
			alert('Must search from home!');
			window.location.assign('/home');
		}
		byName && dispatch(searchByName(e.target[0].value));
		!byName && dispatch(searchById(e.target[0].value));
	}
	return (
		<form className={styles.searchBar} onSubmit={(e) => handleOnSearch(e)}>
			<input className={asset.input} placeholder='Search input...' />
			<button className={asset.button} type='submit'>
				Search by...
			</button>
			<button
				className={asset.button_select}
				onClick={(e) => handleStateChange(e)}>
				{byName ? 'Name' : 'ID'}
			</button>
		</form>
	);
}
