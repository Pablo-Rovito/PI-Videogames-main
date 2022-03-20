import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Store';
import { BrowserRouter } from 'react-router-dom';
import dotenv from 'dotenv';

import App from './App';

import './index.css';
import axios from 'axios';

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</Provider>,

	document.getElementById('root')
);
