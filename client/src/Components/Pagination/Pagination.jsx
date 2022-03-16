import React from 'react';
import asset from '../../Assets/forms.module.css';
import styles from './Pagination.module.css';

export default function Pagination({
	currentPage,
	results,
	totalPosts,
	handlePaginate,
}) {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / results); i++) {
		pageNumbers.push(i);
	}
	return (
		<div className={styles.pages}>
			{pageNumbers.map((number) => {
				return (
					<span
						key={number}
						className={
							currentPage === number ? asset.active : undefined
						}>
						<button
							style={{ minWidth: '2em' }}
							className={asset.button_select}
							onClick={() => handlePaginate(number)}>
							{number}
						</button>
					</span>
				);
			})}
		</div>
	);
}
