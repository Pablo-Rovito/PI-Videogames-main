import React from 'react';

import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

export default function Nav() {

	return (
		<div className={styles.nav}>
			<Link to='/home'>HOME</Link>
			<Link to='/create'>CREATE</Link>
			<div>
				<Link to='/'>Log out</Link>
			</div>
		</div>
	);
}
