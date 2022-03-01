const { getGenresFromApi } = require('../utils/');
const express = require('express');
const router = express.Router();

router.get(`/`, async function (req, res) {
	try {
		res.json(await getGenresFromApi());
	} catch (e) {
		res.json(e);
	}
});

module.exports = router;
