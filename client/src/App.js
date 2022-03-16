import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Detail from './Components/Detail/Detail';
import Create from './Components/Create/Create';
import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav';
import About from './Components/About/About';
import styles from './App.module.css';
import SidePanel from './Components/SidePanel/SidePanel';

export default function App() {
	return (
		<div className={styles.app}>
			<div className={styles.background}></div>
			<div className={styles.nav}>
				<Route path={['/home', '/detail/', '/create', '/about']}>
					<Nav />
				</Route>
			</div>
			<Route path='/home'>
				<div className={styles.sidePanel}>
					<SidePanel />
				</div>
			</Route>
			<div className={styles.site}>
				<Switch>
					<Route exact path='/' component={Landing} />
					<Route exact path='/detail/:id' component={Detail} />
					<Route exact path='/create' component={Create} />
					<Route exact path='/home' component={Home} />
					<Route exact path='/about' component={About} />
					<Redirect to='/' />
				</Switch>
			</div>
		</div>
	);
}
