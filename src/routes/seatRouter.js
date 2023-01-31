const express = require("express");
const seatController = require("../controller/seatAvaiblityController");

const router = express.Router();

router.get('/getAllSeats/:id',seatController.availableSeat)

module.exports=router