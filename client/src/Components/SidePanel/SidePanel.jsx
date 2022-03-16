import React, { useEffect } from 'react';
import {
	getGames,
	getGenres,
	filterByGenres,
	filterByCreator,
	setOrder,
	clearGames,
} from '../../Actions';
import { useDispatch, useSelector } from 'react-redux';
import { DropDown } from '../Filters/Filters';
import styles from './SidePanel.module.css';
import asset from '../../Assets/forms.module.css';
import SearchBar from '../SearchBar/SearchBar';

export default function SidePanel() {
	const dispatch = useDispatch();
	useEffect(() => dispatch(getGenres()), [dispatch]);
	const allGenres = useSelector((state) => state.genres);

	function handleReset(e) {
		e.preventDefault();
		dispatch(clearGames());
		dispatch(getGames());
	}

	return (
		<div className={styles.sidePanel}>
			<div className={styles.search}>
				<SearchBar />
			</div>
			<div className={styles.filters}>
				<DropDown
					showAll={false}
					options={[
						{ name: 'A-Z' },
						{ name: 'Z-A' },
						{ name: '0-5' },
						{ name: '5-0' },
					]}
					actionOnClick={setOrder}
					placeholder={'Set order'}
				/>
				<DropDown
					showAll={true}
					options={[{ name: 'User' }, { name: 'API' }]}
					actionOnClick={filterByCreator}
					placeholder={'Filter by source'}
				/>
				<DropDown
					showAll={true}
					options={allGenres}
					actionOnClick={filterByGenres}
					placeholder={'Filter by genre'}
				/>
				<button
					onClick={(e) => {
						handleReset(e);
					}}
					className={asset.dropdown_button}>
					Reset games
				</button>
			</div>
			<div className={styles.reset}></div>
		</div>
	);
}
