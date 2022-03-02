import React from 'react';
import Todos from '../Todos/Todos';
import style from './Home.module.css';

export function Home() {
	return (
		<div className={style.body}>
			<Todos status={'Todo'} />
			<Todos status={'InProgress'} />
			<Todos status={'Done'} />
		</div>
	);
}

export default Home;