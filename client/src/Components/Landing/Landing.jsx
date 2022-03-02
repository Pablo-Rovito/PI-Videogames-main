import React from 'react';

export default function Landing() {
	const navigateToHome = function () {
        history.push("/home")
		return alert('click gato');
	};
	return (
		<div>
			Esta es la landing Page!
			<button onClick={navigateToHome}>Entrar</button>
		</div>
	);
}
