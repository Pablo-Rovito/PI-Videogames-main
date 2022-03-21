import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName } from '../../Actions';
import styles from './SearchBar.module.css';
import asset from '../../Assets/forms.module.css';

export default function SearchBar() {
	const [byName, setByName] = useState(true);
	const [placeholder, setPlaceholder] = useState('Search...');

	const dispatch = useDispatch();

	function handleStateChange(e) {
		e.preventDefault(e);
		setByName(!byName);
	}

	function handleOnSearch(e) {
		e.preventDefault();
		if (e.target[0].value === '') {
			setPlaceholder('Write something first!');
		} else {
			let dir = window.location.href.split('/');
			let reDirBase = dir[0] + '//' + dir[1] + '/' + dir[2];
			byName
				? dispatch(searchByName(e.target[0].value))
				: window.location.assign(
						`${reDirBase}/detail/${e.target[0].value}`
				  );
		}
	}

	return (
		<form className={styles.searchBar} onSubmit={(e) => handleOnSearch(e)}>
			<div className={styles.top}>
				<input className={asset.input} placeholder={placeholder} />
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
