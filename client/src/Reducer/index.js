const initialState = {
	videogames: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'GET_GAMES':
			return { ...state, videogames: payload };
		default:
			return { ...state };
	}
};

export default rootReducer;
