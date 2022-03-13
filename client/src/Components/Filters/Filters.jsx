import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterByGenres,
	filterByCreator,
	getGenres,
	setOrderName,
	setOrderRating,
} from '../../Actions';

import asset from '../../Assets/forms.module.css';
import styles from './Filters.module.css';

/* export function ByGenre() {
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
		<div className={styles.select}>
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
} */

export function DropDownGenre({ page, placeHolder }) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getGenres());
	}, [dispatch]);

	const allGenres = useSelector((state) => state.genres);

	const [genres, setGenres] = useState([]);

	function handleAddGenre(e) {
		e.preventDefault();
		if (!genres.includes(e.target.value)) {
			setGenres([...genres, e.target.value]);
		}
	}

	function handleSearch(e) {
		e.preventDefault();
		dispatch(filterByGenres(e.target.value));
		setGenres([]);
	}

	return (
		<div className={styles.dropdown}>
			{page === 'SidePanel' && (
				<button onClick={handleSearch} className={asset.button}>
					Search
				</button>
			)}
			<form>
				<div>
					<div className={asset.dropdown}>
						<button
							className={asset.dropdown_button}
							onClick={(e) => {
								e.preventDefault();
							}}>
							{placeHolder}
						</button>
						<div className={asset.dropdown_content}>
							{allGenres.map(({ name }) => {
								return (
									<button
										key={name}
										value={name}
										onClick={(e) => handleAddGenre(e)}>
										{name}
									</button>
								);
							})}
						</div>
					</div>
					<span>
						{genres.map((g) => {
							return (
								<button
									key={g}
									className={asset.button_select}
									onClick={() =>
										setGenres(
											genres.filter(
												(genre) => genre !== g
											)
										)
									}>
									{g}
								</button>
							);
						})}
					</span>
				</div>
			</form>
		</div>
	);
}

export function ByCreation() {
	const dispatch = useDispatch();

	const [creator, setCreator] = useState('Select filter');

	function handleChange(e) {
		e.preventDefault();
		dispatch(filterByCreator(e.target.value));
		setCreator(`Show from ${e.target.value}`);
	}

	return (
		<div className={styles.select}>
			<span>{creator}</span>
			<button
				className={asset.button}
				value={'All'}
				onClick={(e) => handleChange(e)}>
				Show all
			</button>
			<button
				className={asset.button}
				value={'User'}
				onClick={(e) => handleChange(e)}>
				Show from user
			</button>
			<button
				className={asset.button}
				value={'Api'}
				onClick={(e) => handleChange(e)}>
				Show from API
			</button>
		</div>
	);
}

export function Sort() {
	const dispatch = useDispatch();

	const [sort, setSort] = useState('Name');
	const [orderByName, setOrderByName] = useState('A-Z');
	const [orderByRating, setOrderByRating] = useState('0-5');

	function handleStateSort(e) {
		e.preventDefault();
		sort === 'Name' ? setSort('Rating') : setSort('Name');
	}
	function handleStateOrder(e) {
		e.preventDefault();
		sort === 'Name' && orderByName === 'A-Z'
			? setOrderByName('Z-A')
			: setOrderByName('A-Z');
		sort === 'Rating' && orderByRating === '0-5'
			? setOrderByRating('10-0')
			: setOrderByRating('0-10');
	}
	function handleSort(e) {
		e.preventDefault();
		sort === 'Name'
			? dispatch(setOrderName(orderByName))
			: dispatch(setOrderRating(orderByRating));
	}
	return (
		<div className={styles.select}>
			<div className={styles.sortSelector}>
				<button
					style={{ width: '3em' }}
					className={asset.button_select}
					onClick={handleStateSort}>
					{sort}
				</button>
				<button
					style={{ width: '3em' }}
					className={asset.button_select}
					onClick={handleStateOrder}>
					{sort === 'Name' ? orderByName : orderByRating}
				</button>
			</div>
			<div>
				<button
					className={asset.button}
					style={{ width: '8.2em' }}
					onClick={handleSort}>
					Sort
				</button>
			</div>
		</div>
	);
}

export function ResultsPerPage({ allVideogames, results, handleResults }) {
	return (
		<div className={styles.resultsSelector}>
			<span>{`showing ${results} results`}</span>
			<button
				className={asset.button_select}
				value={15}
				onClick={(e) => handleResults(e)}>
				15
			</button>
			<button
				className={asset.button_select}
				value={51}
				onClick={(e) => handleResults(e)}>
				51
			</button>
			<button
				className={asset.button_select}
				value={allVideogames}
				onClick={(e) => handleResults(e)}>
				All
			</button>
		</div>
	);
}
