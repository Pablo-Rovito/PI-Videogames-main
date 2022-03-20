import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import asset from '../../Assets/forms.module.css';
import styles from './Filters.module.css';

import { clearGames, getGames } from '../../Actions';

export function DropDown({
	showAll,
	options,
	actionOnClick,
	placeholder,
	display,
}) {
	const dispatch = useDispatch();

	const [genres, setGenres] = useState([]);

	const games = useSelector((state) => state.videogames);
	const nonAssociative = useSelector((state) => state.nonAssociative);

	useEffect(() => {
		setGenres([]);
	}, [nonAssociative]);

	function handleDispatch(e) {
		e.preventDefault();
		if (e.target.value === 'All') {
			dispatch(clearGames());
			dispatch(getGames());
			return setGenres([]);
		}

		if (Array.isArray(games) && games.length !== 0) {
			!nonAssociative &&
				!genres?.includes(e.target.value) &&
				setGenres([...genres, e.target.value]);
			dispatch(actionOnClick(e.target.value));
		} else {
			setGenres([]);
			dispatch(clearGames());
			dispatch(getGames());
		}
	}

	return (
		<div className={styles.dropdown}>
			<div className={styles.body}>
				<div className={asset.dropdown}>
					<button
						className={asset.dropdown_button}
						onClick={(e) => {
							e.preventDefault();
						}}>
						{placeholder}
					</button>
					<div className={asset.dropdown_content}>
						{showAll && (
							<button
								key='All'
								value='All'
								onClick={(e) => handleDispatch(e)}>
								{'Show all'}
							</button>
						)}
						{options.map(({ name }) => {
							return (
								<button
									key={name}
									value={name}
									onClick={(e) => handleDispatch(e)}>
									{name}
								</button>
							);
						})}
					</div>
				</div>
			</div>
			
			<div className={styles.display}>
				{display &&
					!nonAssociative &&
					genres
						.filter((g) => {
							return g !== 'All';
						})
						.map((g, i) => {
							return i === 0 ? ` ${g} ` : `| ${g} `;
						})}
			</div>
		</div>
	);
}

export function ResultsPerPage({ allVideogames, results, handleResults }) {
	return (
		<div className={styles.resultsSelector}>
			<div>{`showing ${
				allVideogames < results ? allVideogames : results
			} of ${allVideogames} results`}</div>
			<div className={styles.buttons}>
				<button
					style={{ minWidth: '2em' }}
					className={asset.button_select}
					value={15}
					onClick={(e) => handleResults(e)}>
					15
				</button>
				<button
					style={{ minWidth: '2em' }}
					className={asset.button_select}
					value={51}
					onClick={(e) => handleResults(e)}>
					51
				</button>
				<button
					style={{ minWidth: '2em' }}
					className={asset.button_select}
					value={allVideogames}
					onClick={(e) => handleResults(e)}>
					All
				</button>
			</div>
		</div>
	);
}
