import React from 'react';
import { useDispatch } from 'react-redux';

import asset from '../../Assets/forms.module.css';
import styles from './Filters.module.css';

export function DropDown({ showAll, options, actionOnClick, placeholder }) {
	const dispatch = useDispatch();

	function handleDispatch(e) {
		e.preventDefault();
		dispatch(actionOnClick(e.target.value));
	}

	return (
		<div className={styles.dropdown}>
			<div>
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
