import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Landing from './Components/Landing/Landing';
import Detail from './Components/Detail/Detail';
import Create from './Components/Create/Create';
import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav';
import styles from './App.module.css';

export default function App() {
	const logIn = useSelector((state) => state.loggedIn);
	return (
		<div className={styles.app}>
			<div className={styles.background}>
				{logIn && <Nav />}
				<Switch>
					<Route exact path='/' component={Landing} />
					<Route exact path='/detail/:name' component={Detail} />
					<Route exact path='/create' component={Create} />
					<Route exact path='/home' component={Home} />
				</Switch>
			</div>
		</div>
	);
}
