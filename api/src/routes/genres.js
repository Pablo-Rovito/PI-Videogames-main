const { getGenresFromApi } = require('../utils/');
const express = require('express');
const router = express.Router();
var { Genre } = require('../db.js');

require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');

router.get(`/`, async function (req, res) {
	try {
		return res.json(await getGenresFromApi());
	} catch (e) {
		return res.json(e);
	}
});

router.get(`/promise`, function (req, res) {
	axios
		.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
		.then((response) => {
			const genres = response.data.results.map(({ id, name }) => {
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

			return res.json(genres);
		})
		.catch((error) => {
			return res.json(error);
		});
});

module.exports = router;
