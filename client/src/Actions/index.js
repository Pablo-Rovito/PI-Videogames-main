import axios from 'axios';

export function clearGames() {
	return { type: 'CLEAR_GAMES' };
}

export function clearDetail() {
	return { type: 'CLEAR_DETAIL' };
}

export function getGames() {
	return async function (dispatch) {
		try {
			var games = await axios.get('/videogames');
			return dispatch({ type: 'GET_GAMES', payload: games.data });
		} catch (e) {
			console.log(e);
			return dispatch({ type: 'GET_GAMES', payload: 'Error' });
		}
	};
}

export function getGamesPromise() {
	return function (dispatch) {
		axios
			.get('/videogames')
			.then((games) => {
				return dispatch({ type: 'GET_GAMES', payload: games.data });
			})
			.catch((error) => {
				console.log(error);
				return dispatch({ type: 'GET_GAMES', payload: 'Error' });
			});
	};
}

export function getGenres() {
	return async function (dispatch) {
		try {
			var genres = await axios.get('/genres');
			return dispatch({ type: 'GET_GENRES', payload: genres.data });
		} catch (e) {
			console.log(e);
			return dispatch({ type: 'GET_GENRES', payload: 'Error' });
		}
	};
}

export function filterByGenres(payload) {
	return { type: 'FILTER_BY_GENRES', payload };
}

export function switchAssociativity() {
	return { type: 'SWITCH_GENRE_FILTERING' };
}

export function setOrder(payload) {
	return { type: 'SET_ORDER', payload };
}

export function filterByCreator(payload) {
	return { type: 'FILTER_BY_CREATOR', payload };
}

export function searchByName(payload) {
	return async function (dispatch) {
		try {
			var results = await axios.get(
				`/videogames/?name=${payload}`
			);
			var sanitizedResults = [];
			results.data.forEach((r) => {
				let encodedName = encodeURIComponent(r.name);
				sanitizedResults.push({ ...r, name: encodedName });
			});
			return dispatch({
				type: 'SEARCH_BY_NAME',
				payload: sanitizedResults,
			});
		} catch (e) {
			console.log(e);
			return dispatch({ type: 'SEARCH_BY_NAME', payload: 'Error' });
		}
	};
}

export function searchById(payload) {
	return async function (dispatch) {
		try {
			var results = await axios.get(
				`/videogame/${payload}`
			);
			return dispatch({ type: 'SEARCH_BY_ID', payload: results.data });
		} catch (e) {
			console.log(e);
			return dispatch({ type: 'SEARCH_BY_ID', payload: 'Error' });
		}
	};
}

export function postToDb(payload) {
	return async function (dispatch) {
		try {
			await axios.post(`/videogame/`, payload);
			return dispatch({ type: 'ADD_GAME' });
		} catch (e) {
			console.log(e);
			return dispatch({ type: 'ADD_GAME', payload: 'Error' });
		}
	};
}
