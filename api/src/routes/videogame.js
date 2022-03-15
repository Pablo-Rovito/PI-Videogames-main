require('dotenv').config();
const express = require('express');
const router = express.Router();
const { getDetailFromApi, getDetailFromDb, postGameToDb } = require('../utils');
//var { Videogame, Genre } = require('../db.js');

router.get(`/:id`, async function (req, res) {
	let { id } = req.params;
	if (id.length < 20) {
		try {
			return res.json(await getDetailFromApi(id));
		} catch (e) {
			return res.json(e);
		}
	} else {
		try {
			return res.json(await getDetailFromDb(id));
		} catch (e) {
			return res.json(e);
		}
	}
});

router.post('/', async function (req, res) {
	/* const {
		name,
		description,
		rating,
		background_image,
		released,
		genres,
		platforms,
		short_screenshots,
	} = req.body;
 */
	try {
		const response = await postGameToDb(req.body);

		/* const newGame = await Videogame.create({
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

		await newGame.addGenre(gDB); */

		return res.json(response);
	} catch (e) {
		return res.json(e);
	}
});

module.exports = router;
