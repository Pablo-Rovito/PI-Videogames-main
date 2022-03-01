require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
var { Videogame, Genre } = require('../db.js');

module.exports = {
	getGenresFromApi: async function () {
		try {
			let { data } = await axios.get(
				`https://api.rawg.io/api/genres?key=${API_KEY}`
			);
			const genres = data.results.map(({ name, image_background }) => {
				return {
					name,
					image_background,
				};
			});
			genres.forEach(({ name, image_background }) => {
				Genre.findOrCreate({
					where: { name: name, image_background: image_background },
				});
			});
			return genres;
		} catch (e) {
			return e;
		}
	},
	getGamesFromApi: async function () {
		try {
			let games = [];
			let i = 1;
			while (games.length < 100) {
				let { data } = await axios.get(
					`https://api.rawg.io/api/games?key=${API_KEY}&page${i}`
				);
				games = [...games, ...data.results];
				i++;
			}
			result = games.map(
				({
					name,
					description,
					rating,
					background_image,
					released,
					platforms,
					genres,
					short_screenshots,
				}) => {
					return {
						name,
						rating,
						description,
						background_image,
						released,
						platforms: platforms.map(({ platform }) => {
							return platform.name;
						}),
						genres: 'este viene de la db',
						short_screenshots,
						created: false,
					};
				}
			);
			return result;
		} catch (e) {
			return e;
		}
	},
	displayRequiredDataFromAllGames: function (games) {
		return games.map(({ name, description, background_image, genres }) => {
			return { name, description, background_image, genres };
		});
	},
	gamesFromApiQuery: async function (name) {
		try {
			let { data } = await axios.get(
				`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
			);
			return data.results.length < 15
				? data.results
				: data.results.splice(0, 15);
		} catch (e) {
			return e;
		}
	},
	getDetailFromApi: async function (id) {
		try {
			let { data } = await axios.get(
				`https://api.rawg.io/api/games/${id}?key=${API_KEY}`
			);
			let detail = {
				name: data.name,
				background_image: data.background_image,
				rating: data.rating,
				description: data.description,
				released: data.released,
				genres: 'los q correspondan',
				platforms: data.platforms.map(({ platform }) => {
					return platform.name;
				}),
			};
			return detail;
		} catch (e) {
			return e;
		}
	},
	postGameToDb: async function (data) {
		let {
			name,
			image_background,
			rating,
			description,
			released,
			genres,
			platforms,
		} = data;
		let newGame = await Videogame.create({
			name,
			image_background,
			rating,
			description,
			released,
			genres,
			platforms,
		});
		let genre = await Genre.findAll({
			where: { name: genres },
		});
		newGame.addGenre(genre);
	},
};
