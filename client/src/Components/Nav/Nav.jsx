import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
	return (
		<div>
			NAV
			<div>
				<Link to='/'>Home</Link>
				<Link to='/detail'>Detail</Link>
				<Link to='/create'>Create</Link>
			</div>
		</div>
	);
}
