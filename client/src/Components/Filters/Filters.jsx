import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterByGenres,
	filterByCreator,
	getGenres,
	setOrderName,setOrderRating
} from '../../Actions';
import styles from '../Home/Home.module.css';
import moreStyles from './Filters.module.css';

export function ByGenre() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getGenres());
	}, [dispatch]);

	const allGenres = useSelector((state) => state.genres);

	const [genre, setGenre] = useState('Select filter');
	

	function handleChange(e) {
		e.preventDefault();
		dispatch(filterByGenres(e.target.value));
		setGenre(e.target.value);
	}

	return (
		<div className={moreStyles.select}>
			<span>{genre}</span>
			<select
				value={'Filter by genre'}
				className={styles.filter}
				onChange={(e) => handleChange(e)}>
				<option hidden disabled value='Filter by genre'>
					Filter by genre
				</option>
				<option value='All'>All</option>
				{allGenres.map(({ name }) => {
					return (
						<option key={name} value={name}>
							{name}
						</option>
					);
				})}
			</select>
		</div>
	);
}

export function ByOrder() {
	const dispatch = useDispatch();

	const [sort, setSort] = useState('Sort');

	function handleChange(e) {
		e.preventDefault();
		dispatch(setOrderName(e.target.value));
		setSort(e.target.value);
	}
	return (
		<div className={moreStyles.select}>
			<span>{sort}</span>
			<select
				value={'sort'}
				className={styles.filter}
				onChange={(e) => handleChange(e)}>
				<option value='sort'>Sort...</option>
				<option value={'A-Z'}>A-Z</option>
				<option value={'Z-A'}>Z-A</option>
			</select>
		</div>
	);
}

export function ByRating() {
	const dispatch = useDispatch();

	const [sort, setSort] = useState('Sort');

	function handleChange(e) {
		e.preventDefault();
		dispatch(setOrderRating(e.target.value));
		setSort(e.target.value);
	}
	return (
		<div className={moreStyles.select}>
			<span>{sort}</span>
			<select
				value={'sort'}
				className={styles.filter}
				onChange={(e) => handleChange(e)}>
				<option value='sort'>Sort...</option>
				<option value={'0-10'}>0-10</option>
				<option value={'10-0'}>10-0</option>
			</select>
		</div>
	);
}


export function ByCreation() {
	const dispatch = useDispatch();

	const [creator, setCreator] = useState('Select filter');

	function handleChange(e) {
		e.preventDefault();
		dispatch(filterByCreator(e.target.value));
		setCreator(e.target.value);
	}

	return (
		<div className={moreStyles.select}>
			<span>{creator}</span>
			<select
				value={'Filter by creator'}
				className={styles.filter}
				onChange={(e) => handleChange(e)}>
				<option hidden disabled value='Filter by creator'>
					Filter by creator
				</option>
				<option value='All'>All</option>
				<option value='User'>User</option>
				<option value='Company'>Company</option>
			</select>
		</div>
	);
}

export function ResultsPerPage({ allVideogames, results, handleResults }) {
	return (
		<div className={moreStyles.select}>
			<span>{`showing ${results} results`}</span>
			<select
				className={styles.filter}
				value={results}
				onChange={(e) => handleResults(e)}>
				<option value={15}>show 15</option>
				<option value={50}>show 50</option>
				<option value={allVideogames.length}>show all</option>
			</select>
		</div>
	);
}
