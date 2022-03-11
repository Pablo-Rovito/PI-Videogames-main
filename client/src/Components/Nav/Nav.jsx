import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Nav.module.css';

export default function Nav() {
	return (
		<div className={styles.nav}>
			<div className={styles.links}>
				<NavLink to='/home'>HOME</NavLink>
				<NavLink to='/create'>CREATE</NavLink>
				<NavLink to='/about'>ABOUT</NavLink>
			</div>
			<div className={styles.searchBar}>
				<SearchBar />
			</div>
			<div className={styles.logOut}>
				<NavLink to='/'>Log out</NavLink>
			</div>
		</div>
	);
}
