import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Nav.module.css';

export default function Nav() {
	return (
		<div className={styles.nav}>
			<Link to='/home'>HOME</Link>
			<Link to='/create'>CREATE</Link>
			<div>
				<SearchBar />
			</div>
			<div>
				<Link to='/'>Log out</Link>
			</div>
		</div>
	);
}
