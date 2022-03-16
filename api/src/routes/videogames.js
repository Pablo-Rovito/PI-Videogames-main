require('dotenv').config();
const express = require('express');
const router = express.Router();
const {
	getGamesFromDb,
	getGamesFromApi,
	gamesFromApiQuery,
	gamesFromDbQuery,
	displayRequiredDataFromAllGames,
} = require('../utils');

router.get('/', async function (req, res) {
	try {
		let { name } = req.query;
		if (name) {
			let resultsFromApi = await gamesFromApiQuery(name);
			let resultsFromDb = await gamesFromDbQuery(name);
			let results = [...resultsFromApi, ...resultsFromDb];
			return results.length === 0
				? res.status(404).json({ msg: 'no se encontraron resultados' })
				: res.json(displayRequiredDataFromAllGames(results));
		}
		const gamesFromApi = await getGamesFromApi();
		const gamesFromDb = await getGamesFromDb();
		return res.json(
			displayRequiredDataFromAllGames([...gamesFromApi, ...gamesFromDb])
		);
	} catch (e) {
		console.log(e);
		return res.send('Error');
	}
});

module.exports = router;
