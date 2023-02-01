const express = require("express");
const router = express.Router();
const { eventController } = require("../controller/eventController");
const { eventsValidation } = require("../middleware/eventValidation");
const addMessage=require('../controller/messageController')
router.post("/",eventsValidation.eventValidation(),eventsValidation.validate,eventController.postDataAdmin);
router.get("/api/getAll", eventController.getDataEvent);
router.put("/api/update/:id",eventsValidation.updateValidation(),eventsValidation.validate,eventController.updateEvent);
router.delete("/api/delete/:id",eventsValidation.updateValidation(),eventsValidation.validate, eventController.deleteEvent);
router.get("/api/getByid/:id",eventsValidation.updateValidation(),eventsValidation.validate ,eventController.getById);
router.post("/api/onGoingEvent",eventsValidation.onGoingValidation(),eventsValidation.validate,eventController.ongoingEvent);
router.post("/api/futureEvent",eventsValidation.futureValidation(),eventsValidation.validate ,eventController.futureEvent)
router.post("/api/pastEvent", eventsValidation.pastValidation(),eventsValidation.validate,eventController.pastEvent)
router.post("/api/message",addMessage)
module.exports = router;
