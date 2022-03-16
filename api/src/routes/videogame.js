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
	try {
		const response = await postGameToDb(req.body);

		return res.json(response);
	} catch (e) {
		return res.json(e);
	}
});

module.exports = router;
