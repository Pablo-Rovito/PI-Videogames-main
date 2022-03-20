require('dotenv').config();
const express = require('express');
const router = express.Router();
const { getDetailFromApi, getDetailFromDb, postGameToDb } = require('../utils');

router.get(`/:id`, async function (req, res) {
	let { id } = req.params;
	if (id.includes('db')) {
		try {
			return res.json(await getDetailFromDb(id));
		} catch (e) {
			return res.json(e);
		}
	} else {
		try {
			return res.json(await getDetailFromApi(id));
		} catch (e) {
			return res.json(e);
		}
	}
});

router.post('/', async function (req, res) {
	try {
		return res.json(await postGameToDb(req.body));
	} catch (e) {
		return res.json(e);
	}
});

module.exports = router;
