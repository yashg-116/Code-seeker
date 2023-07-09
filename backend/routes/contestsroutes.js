const express = require('express');
const router = express.Router();
const { cf, cc, ac } = require('../controllers/contestController');

router.route("/cf").get(cf)

router.route("/cc").get(cc)

router.route("/ac").get(ac)

module.exports = router