import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName, searchById } from '../../Actions';
import styles from './SearchBar.module.css';

export default function SearchBar() {
	const [byName, setByName] = useState(false);

	const dispatch = useDispatch();

	function handleOnSearch(e) {
		e.preventDefault();
		byName && dispatch(searchByName(e.target[0].value));
		!byName && dispatch(searchById(e.target[0].value));
	}
	return (
		<form className={styles.searchBar} onSubmit={handleOnSearch}>
			<input
				className={styles.input}
				placeholder='Search by name or ID'
			/>
			<button className={styles.button} type='submit'>
				{byName ? 'Search by name' : 'Search by ID'}
			</button>
			<input
				className={styles.checkBox}
				type='checkbox'
				onChange={() => setByName(!byName)}
			/>
		</form>
	);
}
