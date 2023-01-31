const express = require("express");
const router = express.Router();
const { eventController } = require("../controller/eventController");
<<<<<<< HEAD
router.post("/", eventController.postDataAdmin);
router.get("/api/getall", eventController.getDataEvent);
router.put("/api/update/:id", eventController.updateEvent);
router.delete("/api/delete/:id", eventController.deleteEvent);
router.get("/api/getbyid/:id", eventController.getById);
router.post("/api/ongoingevent", eventController.ongoingEvent);
router.post("/api/futureevent", eventController.futureEvent);
router.post("/api/pastevent", eventController.pastEvent);
=======
const { eventsValidation } = require("../middleware/eventValidation");
router.post("/",eventsValidation.eventValidation(),eventsValidation.validate,eventController.postDataAdmin);
router.get("/api/getAll", eventController.getDataEvent);
router.put("/api/update/:id",eventsValidation.updateValidation(),eventsValidation.validate,eventController.updateEvent);
router.delete("/api/delete/:id",eventsValidation.updateValidation(),eventsValidation.validate, eventController.deleteEvent);
router.get("/api/getByid/:id",eventsValidation.updateValidation(),eventsValidation.validate ,eventController.getById);
router.post("/api/onGoingEvent",eventsValidation.onGoingValidation(),eventsValidation.validate,eventController.ongoingEvent);
router.post("/api/futureEvent",eventsValidation.futureValidation(),eventsValidation.validate ,eventController.futureEvent)
router.post("/api/pastEvent", eventsValidation.pastValidation(),eventsValidation.validate,eventController.pastEvent)
>>>>>>> c445b0889ed491a663bc1c456e3724f959026928
module.exports = router;
