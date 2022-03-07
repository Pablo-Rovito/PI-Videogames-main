import axios from 'axios';

export function getGames() {
	return async function (dispatch) {
		var games = await axios.get('http://localhost:3001/videogames');
		return dispatch({ type: 'GET_GAMES', payload: games.data });
	};
}

export function getGenres() {
	return async function (dispatch) {
		var genres = await axios.get('http://localhost:3001/genres');
		return dispatch({ type: 'GET_GENRES', payload: genres.data });
	};
}

export function filterByGenres(payload) {
	return { type: 'FILTER_BY_GENRES', payload };
}

export function setOrder(payload) {
	return { type: 'SET_ORDER', payload };
}

export function filterByCreator(payload) {
	return { type: 'FILTER_BY_CREATOR', payload };
}

export function searchByName(payload) {
	return async function (dispatch) {
		var results = await axios.get(
			`http://localhost:3001/videogames/?name=${payload.toLowerCase()}`
		);
		return dispatch({ type: 'SEARCH_BY_NAME', payload: results.data });
	};
}

export function searchById(payload) {
	return async function (dispatch) {
		var results = await axios.get(
			`http://localhost:3001/videogame/${payload}`
		);
		return dispatch({ type: 'SEARCH_BY_ID', payload: results.data });
	};
}

export function postToDb(payload) {
	return async function (dispatch) {
		var results = await axios.post(
			`http://localhost:3001/videogame/`,
			payload
		);
		return dispatch({ type: 'ADD_GAME', payload: results.data });
	};
}
