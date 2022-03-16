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
			var games = await axios.get('http://localhost:3001/videogames');
			return dispatch({ type: 'GET_GAMES', payload: games.data });
		} catch (e) {
			console.log(e);
			return dispatch({ type: 'GET_GAMES', payload: 'Error' });
		}
	};
}

export function getGenres() {
	return async function (dispatch) {
		try {
			var genres = await axios.get('http://localhost:3001/genres');
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

export function setOrder(payload) {
	return { type: 'SET_ORDER', payload };
}

export function setOrderName(payload) {
	return { type: 'SET_ORDER_NAME', payload };
}

export function setOrderRating(payload) {
	return { type: 'SET_ORDER_RATING', payload };
}

export function filterByCreator(payload) {
	return { type: 'FILTER_BY_CREATOR', payload };
}

export function searchByName(payload) {
	return async function (dispatch) {
		try {
			var results = await axios.get(
				`http://localhost:3001/videogames/?name=${payload}`
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
				`http://localhost:3001/videogame/${payload}`
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
			await axios.post(`http://localhost:3001/videogame/`, payload);
			return dispatch({ type: 'ADD_GAME' });
		} catch (e) {
			console.log(e);
			return dispatch({ type: 'ADD_GAME', payload: 'Error' });
		}
	};
}
