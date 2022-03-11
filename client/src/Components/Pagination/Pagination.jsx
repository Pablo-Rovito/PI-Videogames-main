import React from 'react';
import asset from '../../Assets/forms.module.css';

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
