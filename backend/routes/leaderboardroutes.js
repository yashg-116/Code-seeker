const express = require('express');
const router = express.Router();
const { createlb, getlb, addlb, deletelb } = require('../controllers/leaderboardController');

router.route("/create").post(createlb)

router.route("/get/:id").get(getlb)

router.route("/add/:id").put(addlb)

router.route("/delete/:id").delete(deletelb)

module.exports = router