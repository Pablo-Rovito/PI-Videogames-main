import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
	return (
		<div>
			<div>
				<Link to='/home'>Home</Link>
				<Link to='/detail'>Detail</Link>
				<Link to='/create'>Create</Link>
				<Link to='/'>Log out</Link>
			</div>
		</div>
	);
}
