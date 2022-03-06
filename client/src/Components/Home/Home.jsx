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
} from '../Filters/Filters';

export default function Home() {
	const dispatch = useDispatch();

	const allVideogames = useSelector((state) => state.videogames);

	const [results, setResults] = useState(15);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		dispatch(getGames());
	}, [dispatch]);

	useEffect(() => {
		setLoading(!loading);
		setCurrentPage(1);
	}, [allVideogames]);

	function handleResults(e) {
		e.preventDefault();
		setResults(e.target.value);
	}

	function handlePaginate(n) {
		setCurrentPage(n);
	}

	const indexOfLastPost = currentPage * results;
	const indexOfFirstPost = indexOfLastPost - results;
	const currentPosts = allVideogames.slice(indexOfFirstPost, indexOfLastPost);

	return (
		<div className={styles.global}>
			<div className={styles.head}>
				<h2>HOME</h2>
			</div>
			<div className={styles.filters}>
				<ResultsPerPage
					allVideogames={allVideogames}
					results={results}
					handleResults={handleResults}
				/>
				<ByCreation />
				<ByGenre />
				<ByOrder />
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
