const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

router.get('/getalluser',userController.getAllUserData)
router.post('/deactiveuser',userController.deactivateUser)
router.get('/getuserbyname',userController.getUserByName)


module.exports = router;