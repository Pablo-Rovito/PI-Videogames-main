import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames } from '../../Actions';
import styles from './Home.module.css';
import Page from '../Page/Page';
import Pagination from '../Pagination/Pagination';
import {
	ByGenre,
	ByOrder,
	ByCreation,
	ResultsPerPage,
	ByRating,
} from '../Filters/Filters';
import SearchBar from '../SearchBar/SearchBar';

export default function Home() {
	const dispatch = useDispatch();

	const allVideogames = useSelector((state) => state.videogames);

	const [results, setResults] = useState(15);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [orderSelector, setOrderSelector] = useState('Sort by name');

	useEffect(() => {
		dispatch(getGames());
	}, [dispatch]);

	useEffect(() => {
		setLoading((loading) => !loading);
		setCurrentPage(1);
	}, [allVideogames]);

	function handleResults(e) {
		e.preventDefault();
		setResults(e.target.value);
	}

	function handlePaginate(n) {
		setCurrentPage(n);
	}

	function handleOrderSelector(e) {
		e.preventDefault();
		setOrderSelector(
			orderSelector === 'Sort by name' ? 'Sort by rating' : 'Sort by name'
		);
	}

	const indexOfLastPost = currentPage * results;
	const indexOfFirstPost = indexOfLastPost - results;
	const currentPosts = allVideogames.slice(indexOfFirstPost, indexOfLastPost);

	return (
		<div className={styles.global}>
			<div className={styles.head}>
				<SearchBar />
			</div>
			<div className={styles.filters}>
				<ResultsPerPage
					allVideogames={allVideogames}
					results={results}
					handleResults={handleResults}
				/>
				<ByCreation />
				<ByGenre />
				<span>
					<button onClick={handleOrderSelector}>
						{orderSelector}
					</button>
				</span>
				{orderSelector === 'Sort by name' && <ByOrder />}
				{orderSelector === 'Sort by rating' && <ByRating />}
			</div>

			<div>
				<Page gamesInPage={currentPosts} loading={loading} />
			</div>
			<span>
				<Pagination
					results={results}
					totalPosts={allVideogames.length}
					handlePaginate={handlePaginate}
				/>
			</span>
		</div>
	);
}
