import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

export default function Nav() {
	return (
		<div className={styles.nav}>
			<Link to='/home'>Home</Link>
			<Link to='/detail'>Detail</Link>
			<Link to='/create'>Create</Link>
			<Link to='/'>Log out</Link>
		</div>
	);
}
