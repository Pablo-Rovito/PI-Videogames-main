import React from 'react';

export default function Landing(params) {
	function navigateOnClick() {
		params.history.push('/home');
	}
	return (
		<div>
			<h1>Henry Videogames</h1>
			<button onClick={navigateOnClick}>Entrar</button>
		</div>
	);
}
