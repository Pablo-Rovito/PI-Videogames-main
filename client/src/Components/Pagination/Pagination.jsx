import React from 'react';
import styles from './Pagination.module.css';

export default function Pagination({ results, totalPosts, handlePaginate }) {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / results); i++) {
		pageNumbers.push(i);
	}
	return (
		<div>
			{pageNumbers.map((number) => {
				return (
					<span key={number}>
						<button
							className={styles.button}
							onClick={() => handlePaginate(number)}>
							{number}
						</button>
					</span>
				);
			})}
		</div>
	);
}
