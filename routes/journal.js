const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
	models.Journal.findAll()
	.then(journals => {
		res.send(journals);
	})
	.catch()
});

module.exports = router;