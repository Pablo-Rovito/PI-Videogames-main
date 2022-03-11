import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames } from '../../Actions';
import styles from './Home.module.css';
import asset from '../../Assets/forms.module.css';
import Page from '../Page/Page';
import Pagination from '../Pagination/Pagination';
import { ResultsPerPage } from '../Filters/Filters';

export default function Home() {
	const dispatch = useDispatch();

	const allVideogames = useSelector((state) => state.videogames);
	const refreshState = useSelector((state) => state.refresh);

	const [results, setResults] = useState(15);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		refreshState && dispatch(getGames());
	}, [dispatch]);

	useEffect(() => {
		setLoading((loading) => !loading);
		setCurrentPage(1);
	}, [allVideogames, results]);

	function handleResults(e) {
		e.preventDefault();
		setResults(e.target.value);
	}

	function handlePaginate(n) {
		setCurrentPage(n);
	}

	const indexOfLastPost = currentPage * results;
	const indexOfFirstPost = indexOfLastPost - results;
	const currentPosts = allVideogames?.slice(
		indexOfFirstPost,
		indexOfLastPost
	);

	return (
		<div className={asset.global}>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Page gamesInPage={currentPosts} loading={loading} />
			</div>
			<span className={styles.filters}>
				<ResultsPerPage
					allVideogames={allVideogames.length}
					results={results}
					handleResults={handleResults}
				/>
			</span>
			<div className={styles.pagination}>
				<Pagination
					results={results}
					totalPosts={allVideogames.length}
					handlePaginate={handlePaginate}
				/>
			</div>
		</div>
	);
}
