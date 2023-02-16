const express = require("express");
const googleAuthControllerService = require("../controller/googleAuthController");
const router = express.Router();
/**
 *@description  Define the route for Google authentication
 */
router.post("/googleauth", googleAuthControllerService);

module.exports = router;
