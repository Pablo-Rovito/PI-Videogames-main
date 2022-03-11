require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Op } = require('sequelize');
var { Videogame, Genre } = require('../db.js');

module.exports = {
	getGenresFromApi: async function () {
		try {
			let { data } = await axios.get(
				`https://api.rawg.io/api/genres?key=${API_KEY}`
			);
			const genres = data.results.map(({ name }) => {
				return {
					name,
				};
			});
			genres.forEach(({ name }) => {
				Genre.findOrCreate({
					where: { name: name },
				});
			});
			return genres;
		} catch (e) {
			return e;
		}
	},
	getGamesFromDb: async function () {
		return await Videogame.findAll({
			include: {
				model: Genre,
				attributes: ['name'],
				through: { attributes: [] },
			},
		});
	},
	getGamesFromApi: async function () {
		try {
			let games = [];
			let address = '';
			while (games.length < 100) {
				!games.length &&
					(address = `https://api.rawg.io/api/games?key=${API_KEY}`);
				let { data } = await axios.get(address);
				games = [...games, ...data.results];
				address = data.next;
			}
			result = games.map(
				({
					id,
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
						apiId: id,
						name,
						rating,
						description: description
							? description
							: 'No description found',
						background_image,
						released,
						platforms: platforms.map(({ platform }) => {
							return platform.name;
						}),
						genres: genres.map(({ name }) => {
							return { name };
						}),
						short_screenshots,
					};
				}
			);
			return result;
		} catch (e) {
			return e;
		}
	},
	displayRequiredDataFromAllGames: function (games) {
		return games.map(
			({
				id,
				apiId,
				name,
				description,
				rating,
				background_image,
				released,
				genres,
				platforms,
				short_screenshots,
				created,
			}) => {
				return {
					id,
					apiId,
					name,
					description: description
						? description
						: 'No description found',
					rating,
					background_image,
					released,
					genres,
					platforms,
					short_screenshots,
					created,
				};
			}
		);
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
	gamesFromDbQuery: async function (name) {
		try {
			return await Videogame.findAll({
				where: { name: { [Op.iLike]: `%${name}%` } },
				include: {
					model: Genre,
					attributes: ['name'],
				},
			});
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
				apiId: data.id,
				name: data.name,
				description: data.description
					? data.description
					: 'No description found',
				rating: data.rating,
				background_image: data.background_image,
				released: data.released,
				genres: data.genres,
				platforms: data.platforms.map(({ platform }) => {
					return platform.name;
				}),
				short_screenshots: data.short_screenshots
					? data.short_screenshots
					: [{ id: 1, image: data.background_image }],
			};
			return detail;
		} catch (e) {
			return e;
		}
	},
	postGameToDb: async function (data) {
		try {
			let {
				name,
				description,
				rating,
				background_image,
				released,
				genres,
				platforms,
				short_screenshots,
			} = data;
			let newGame = await Videogame.findOrCreate({
				where: {
					name,
					description,
					rating,
					background_image,
					released,
					platforms,
					short_screenshots,
				},
			});
			let genre = await Genre.findAll({
				where: { name: genres },
			});
			newGame.addGenre(genre);
		} catch (e) {
			return e;
		}
	},
};
