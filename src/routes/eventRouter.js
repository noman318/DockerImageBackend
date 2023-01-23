const express = require("express");
const router = express.Router();
const { eventController } = require("../controller/eventController");
router.post("/", eventController.postDataAdmin);
router.get("/api/getall", eventController.getDataEvent);
router.put("/api/update/:id", eventController.updateEvent);
router.delete("/api/delete/:id", eventController.deleteEvent);
router.get("/api/getbyid/:id", eventController.getById);
module.exports = router;
