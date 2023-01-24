const express = require("express");
const router = express.Router();
const { eventController } = require("../controller/eventController");
router.post("/", eventController.postDataAdmin);
router.get("/api/getall", eventController.getDataEvent);
router.put("/api/update/:id", eventController.updateEvent);
router.delete("/api/delete/:id", eventController.deleteEvent);
router.get("/api/getbyid/:id", eventController.getById);
router.post("/api/ongoingevent",eventController.ongoingEvent);
router.post("/api/futureevent",eventController.futureEvent)
router.post("/api/pastevent",eventController.pastEvent)
module.exports = router;
