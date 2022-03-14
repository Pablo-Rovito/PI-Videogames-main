require('dotenv').config();
const express = require('express');
const router = express.Router();
const { getDetailFromApi, postGameToDb } = require('../utils');

router.get(`/:id`, async function (req, res) {
	try {
		let { id } = req.params;
		return res.json(await getDetailFromApi(id));
	} catch (e) {
		return res.json(e);
	}
});

router.post('/', async function (req, res) {
	try {
		postGameToDb(req.body);
		return res.json({ msg: 'Game created' });
	} catch (e) {
		return res.json(e);
	}
});

module.exports = router;
