import React from 'react';
import { Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Landing from './Components/Landing/Landing';
import Detail from './Components/Detail/Detail';
import Create from './Components/Create/Create';

import './App.css';
function App() {
	return (
		<div className='App'>
			<h1>Henry Videogames</h1>
			<Nav />
			<Route exact path='/' component={Landing} />
			<Route exact path='/detail' component={Detail} />
			<Route exact path='/create' component={Create} />
		</div>
	);
}

export default App;
