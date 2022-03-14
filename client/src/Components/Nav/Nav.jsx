import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';
import { IoPower } from 'react-icons/io5';
import henryLogo from '../../Assets/henryLogo.png';

export default function Nav() {
	return (
		<div className={styles.nav}>
			<div className={styles.links}>
				<NavLink to='/home'>HOME</NavLink>
				<NavLink to='/create'>CREATE</NavLink>
				<NavLink to='/about'>ABOUT</NavLink>
			</div>
			<div className={styles.topLeft}>
				<a
					href='https://www.soyhenry.com/'
					target='_blank'
					rel='noreferrer noopener'>
					<img
						src={henryLogo}
						alt=''
						style={{ maxHeight: '60%', maxWidth: '60%' }}
					/>
				</a>
			</div>
			<div className={styles.logOut}>
				<NavLink to='/'>
					<IoPower />
				</NavLink>
			</div>
		</div>
	);
}
