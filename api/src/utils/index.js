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
	getGamesFromDb: async function () {
		return await Videogame.findAll({
			include: {
				model: Genre,
				attributes: ['id', 'name', 'image_background'],
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
						id,
						name,
						rating,
						description,
						background_image,
						released,
						platforms: platforms.map(({ platform }) => {
							return platform.name;
						}),
						genres: genres.map(({ name, image_background }) => {
							return { name, image_background };
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
			({ id, name, description, background_image, genres }) => {
				return { id, name, description, background_image, genres };
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
					attributes: ['name', 'image_background'],
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
			platforms,
		});
		let genre = await Genre.findAll({
			where: { name: genres },
		});
		newGame.addGenre(genre);
	},
};
