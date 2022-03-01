require('dotenv').config();
const express = require('express');
const router = express.Router();
const {
	getGamesFromApi,
	gamesFromApiQuery,
	displayRequiredDataFromAllGames,
} = require('../utils');

router.get('/', async function (req, res) {
	try {
		let { name } = req.query;
		if (name) {
			let results = await gamesFromApiQuery(name);
			results.length === 0
				? res.status(404).json({ msg: 'no se encontraron resultados' })
				: res.json(results);
		}
		const games = await getGamesFromApi();
		res.json(displayRequiredDataFromAllGames(games));
	} catch (e) {
		res.send(e);
	}
});

module.exports = router;
