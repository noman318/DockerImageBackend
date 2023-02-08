const express = require('express');
const googleAuthControllerService = require('../controller/googleAuthController');
const router = express.Router();

router.post('/googleauth',googleAuthControllerService)

module.exports = router