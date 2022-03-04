import axios from 'axios';

export function getGames() {
	return async function (dispatch) {
		var games = await axios.get('http://localhost:3001/videogames');
		return dispatch({ type: 'GET_GAMES', payload: games.data });
	};
}
