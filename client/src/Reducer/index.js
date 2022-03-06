const initialState = {
	videogames: [],
	genres: [],
	allVideogames: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'GET_GAMES':
			state.allVideogames = payload;
			return { ...state, videogames: payload };
		case 'GET_GENRES':
			return { ...state, genres: payload };
		case 'FILTER_BY_GENRES':
			state.videogames = state.allVideogames;
			var filteredByGenre = [];
			if (payload === 'All') {
				return { ...state };
			}
			state.videogames.forEach((game) => {
				game.genres.map((genre) => {
					if (Object.values(genre).includes(payload))
						filteredByGenre.push(game);
				});
			});
			return { ...state, videogames: filteredByGenre };
		case 'FILTER_BY_CREATOR':
			state.videogames = state.allVideogames;
			var filteredByCreator = [];
			if (payload === 'All') {
				return { ...state };
			}
			if (payload === 'User') {
				filteredByCreator = state.allVideogames.filter(
					(game) => game.created === true
				);
				return { ...state, videogames: filteredByCreator };
			}
			filteredByCreator = state.allVideogames.filter(
				(game) => game.created !== true
			);
			return { ...state, videogames: filteredByCreator };
		case 'SET_ORDER':
			return {
				...state,
				videogames: [...state.videogames].sort(function (a, b) {
					if (payload === 'A-Z') {
						return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
					}
					return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
				}),
			};
		default:
			return { ...state };
	}
};

export default rootReducer;
