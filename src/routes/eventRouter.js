const express = require("express");
const router = express.Router();
const { eventController } = require("../controller/eventController");
const addNotification = require("../controller/notificationController");
const { eventsValidation } = require("../middleware/eventValidation");
const upload = require("../middleware/multerMiddleware");
// POST endpoint to create an event
router.post(
  "/",
  upload.single("file"),
  eventsValidation.eventValidation(),
  eventsValidation.validate,
  eventController.postDataAdmin
);
// GET endpoint to get all events
router.post("/api/getAll", eventController.getDataEvent);
// PUT endpoint to update an event by ID
router.put(
  "/api/update/:id",
  upload.single("file"),
  eventsValidation.updateValidation(),
  eventsValidation.validate,
  eventController.updateEvent
);
// DELETE endpoint to delete an event by ID
router.delete(
  "/api/delete/:id",
  eventsValidation.updateValidation(),
  eventsValidation.validate,
  eventController.deleteEvent
);

// GET endpoint to get an event by ID
router.get(
  "/api/getByid/:id",
  eventsValidation.updateValidation(),
  eventsValidation.validate,
  eventController.getById
);
// POST endpoint to get ongoing events
router.post(
  "/api/onGoingEvent",
  eventsValidation.onGoingValidation(),
  eventsValidation.validate,
  eventController.ongoingEvent
);
// POST endpoint to get future events
router.post(
  "/api/futureEvent",
  eventsValidation.futureValidation(),
  eventsValidation.validate,
  eventController.futureEvent
);
// POST endpoint to get past events
router.post(
  "/api/pastEvent",
  eventsValidation.pastValidation(),
  eventsValidation.validate,
  eventController.pastEvent
);
// POST endpoint to add a notification
router.post("/notification", addNotification);
// POST endpoint to get a FPN token
router.post("/api/fpntoken", eventController.getFPNToken);
module.exports = router;
