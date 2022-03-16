const initialState = {
	videogames: [],
	videogame: {},
	genres: [],
	allVideogames: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'CLEAR_GAMES':
			return { ...state, videogames: [] };
		case 'CLEAR_DETAIL':
			return { ...state, videogame: {} };
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
				game.genres.forEach((genre) => {
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
				return filteredByCreator.length === 0
					? { ...state, videogames: [{ status: 404 }] }
					: { ...state, videogames: filteredByCreator };
			}
			filteredByCreator = state.allVideogames.filter(
				(game) => game.created !== true
			);
			return { ...state, videogames: filteredByCreator };
		case 'SET_ORDER':
			return {
				...state,
				videogames: [...state.videogames].sort(function (a, b) {
					switch (payload) {
						case 'A-Z':
							return a.name > b.name
								? 1
								: a.name < b.name
								? -1
								: 0;
						case 'Z-A':
							return a.name > b.name
								? -1
								: a.name < b.name
								? 1
								: 0;
						case '0-5':
							return a.rating > b.rating
								? 1
								: a.rating < b.rating
								? -1
								: 0;
						case '5-0':
							return a.rating > b.rating
								? -1
								: a.rating < b.rating
								? 1
								: 0;
						default:
							return 'Error';
					}
				}),
			};
		case 'SEARCH_BY_NAME':
			return { ...state, videogames: payload };
		case 'SEARCH_BY_ID':
			return { ...state, videogame: payload };
		case 'ADD_GAME':
			return { ...state };
		default:
			return { ...state };
	}
};

export default rootReducer;
