import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Home.module.css';
import asset from '../../Assets/forms.module.css';
import Loader from '../Loader/Loader';
import Page from '../Page/Page';
import Pagination from '../Pagination/Pagination';
import { ResultsPerPage } from '../Filters/Filters';
import { clearDetail, getGames } from '../../Actions';

import img404 from '../../Assets/404.png';

export default function Home() {
	const dispatch = useDispatch();
	const allVideogames = useSelector((state) => state.videogames);

	const [results, setResults] = useState(15);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		dispatch(clearDetail());
		!allVideogames.length && dispatch(getGames());
		setCurrentPage(1);
	}, [dispatch, results, allVideogames]);

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
	return allVideogames.length === 0 ? (
		<div>
			<Loader />
		</div>
	) : allVideogames === 'Error' ? (
		<div>
			<h3>Nothing found...</h3>
			<img className={styles.img} src={img404} alt='' />
		</div>
	) : (
		<div className={asset.global}>
			<div className={styles.home}>
				<span className={styles.filters}>
					<ResultsPerPage
						allVideogames={allVideogames.length}
						results={results}
						handleResults={handleResults}
					/>
				</span>

				<div className={styles.pagination}>
					<Pagination
						currentPage={currentPage}
						results={results}
						totalPosts={allVideogames.length}
						handlePaginate={handlePaginate}
					/>
				</div>

				<div className={styles.page}>
					<Page gamesInPage={currentPosts} />
				</div>
			</div>
		</div>
	);
}
