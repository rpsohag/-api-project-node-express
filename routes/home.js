const express = require('express');
const { showHomePage } = require('../controllers/homeController');
const router = express.Router();

router.get('/', showHomePage);

module.exports = router;