const { getGenresFromApi } = require('../utils/');
const express = require('express');
const router = express.Router();

router.get(`/`, async function (req, res) {
	try {
		return res.json(await getGenresFromApi());
	} catch (e) {
		return res.json(e);
	}
});

module.exports = router;
