require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Op, Sequelize } = require('sequelize');
var { Videogame, Genre } = require('../db.js');

async function idGen() {
	const gamesFromDb = await Videogame.findAll({ attributes: ['id'] });
	var id = 'db0';
	if (gamesFromDb.length) {
		const ids = gamesFromDb.map((g) => {
			return g.dataValues.id;
		});
		const intIds = ids?.map((id) => {
			return parseInt(id.slice(2));
		});
		const max = Math.max(...intIds);
		id = 'db' + (max + 1);
	}

	return id;
}

module.exports = {
	getGenresFromApi: async function () {
		try {
			let { data } = await axios.get(
				`https://api.rawg.io/api/genres?key=${API_KEY}`
			);
			const genres = data.results.map(({ id, name }) => {
				return {
					id,
					name,
				};
			});
			genres.forEach(({ id, name }) => {
				Genre.findOrCreate({
					where: { id: id, name: name },
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
				attributes: ['id', 'name'],
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
						id,
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
						genres: genres.map(({ id, name }) => {
							return { id, name };
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
					attributes: ['id', 'name'],
					through: { attributes: [] },
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
	getDetailFromDb: async function (id) {
		try {
			const games = await Videogame.findAll({
				where: { id: id },
				include: {
					model: Genre,
					attributes: ['id', 'name'],
					through: { attributes: [] },
				},
			});

			return games[0];
		} catch (e) {
			return e;
		}
	},
	postGameToDb: async function (data) {
		const {
			name,
			description,
			rating,
			background_image,
			released,
			genres,
			platforms,
			short_screenshots,
		} = data;

		let id = await idGen();

		try {
			const newGame = await Videogame.create({
				id: id,
				name,
				description,
				rating,
				background_image,
				released,
				platforms,
				short_screenshots,
			});

			const gDB = await Genre.findAll({
				where: { name: genres },
			});

			await newGame.addGenre(gDB);

			return { msg: 'Game created' };
		} catch (e) {
			return e;
		}
	},
};
