const express = require("express");
const router = express.Router();
const { eventController } = require("../controller/eventController");
const addNotification = require("../controller/notificationController");
const { eventsValidation } = require("../middleware/eventValidation");
const upload = require("../middleware/multerMiddleware");

router.post(
  "/",
  upload.single("file"),
  eventsValidation.eventValidation(),
  eventsValidation.validate,
  eventController.postDataAdmin
);
router.post("/api/getAll", eventController.getDataEvent);
router.put(
  "/api/update/:id",
  eventsValidation.updateValidation(),
  eventsValidation.validate,
  eventController.updateEvent
);

router.delete(
  "/api/delete/:id",
  eventsValidation.updateValidation(),
  eventsValidation.validate,
  eventController.deleteEvent
);
router.get(
  "/api/getByid/:id",
  eventsValidation.updateValidation(),
  eventsValidation.validate,
  eventController.getById
);
router.post(
  "/api/onGoingEvent",
  eventsValidation.onGoingValidation(),
  eventsValidation.validate,
  eventController.ongoingEvent
);
router.post(
  "/api/futureEvent",
  eventsValidation.futureValidation(),
  eventsValidation.validate,
  eventController.futureEvent
);
router.post(
  "/api/pastEvent",
  eventsValidation.pastValidation(),
  eventsValidation.validate,
  eventController.pastEvent
);
router.post("/notification", addNotification);
router.post("/api/fpntoken", eventController.getFPNToken);
module.exports = router;
