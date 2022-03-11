import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Landing from './Components/Landing/Landing';
import Detail from './Components/Detail/Detail';
import Create from './Components/Create/Create';
import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav';
import styles from './App.module.css';
import './normalize.css';
import SidePanel from './Components/SidePanel/SidePanel';

export default function App() {
	const logIn = useSelector((state) => state.loggedIn);
	return (
		<div className={styles.app}>
			<div className={styles.background}></div>
			<div className={styles.nav}>{true && <Nav />}</div>
			<div className={styles.sidePanel}>{true && <SidePanel />}</div>
			<div className={styles.site}>
				<Switch>
					<Route exact path='/' component={Landing} />
					<Route exact path='/detail/:id' component={Detail} />
					<Route exact path='/create' component={Create} />
					<Route exact path='/home' component={Home} />
					<Redirect to='/' />
				</Switch>
			</div>
		</div>
	);
}
