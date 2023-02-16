const upload = require("../middleware/multerMiddleware");
const { eventHandler } = require("../services/eventServices");
/**
 * @postDataAdmin Handles POST requests to add a new event to the database. The function uploads the file and adds the event data to the database.
 * @res Returns a JSON response with the added data.
 */
async function postDataAdmin(req, res) {
  const requestBody = req.body;
  console.log(requestBody);
  const url =
    req.protocol + "://" + req.get("host") + "/static/" + req.file.filename;
  const data1 = { ...requestBody, image: url };

  let data = await eventHandler.PostData(data1);
  if (!data) {
    res.status(404).json({ err: 1, message: "Please Provide Data" });
  } else {
    res.status(200).json(data);
  }
}
/**
 * @getDataEvent Handles GET requests to retrieve all events from the database.
 */
async function getDataEvent(req, res) {
  let data = await eventHandler.getAlldata(req.body);
  if (!data) {
    res
      .status(404)
      .json({ err: 1, message: "Something is wrong with getting data" });
  } else {
    res.status(200).json(data);
  }
}
/**
 *
 * @updateEvent Handles PUT requests to update an existing event in the database.
 * @req event of the object
 */
async function updateEvent(req, res) {
  var requestBody = req.body;
  if (req.file) {
    const url =
      req.protocol + "://" + req.get("host") + "/static/" + req.file.filename;
    var requestBody = { ...requestBody, image: url };
    var data = await eventHandler.updateImageEvent(req.params.id);
  }
  var data = await eventHandler.updateEvent(req.params.id, requestBody);
  if (!data) {
    res.status(404).json({ err: 1, message: "data is not update" });
  } else {
    res.status(200).json(data);
  }
}
/**
 *
 * @deleteEvent  Handles DELETE requests to delete an event from the database.
 * @req event id
 */
async function deleteEvent(req, res) {
  let data = await eventHandler.deleteEvent(req.params.id);
  if (!data) {
    res.status(404).json({ err: 1, message: "id is wrong" });
  } else {
    res.status(200).json(data);
  }
}
/**
 *
 *@getById  Handles GET requests to retrieve a specific event from the database.
 */
async function getById(req, res) {
  let data = await eventHandler.getByid(req.params.id);
  if (!data) {
    res.status(404).json({ err: 1, message: "Id is Wrong" });
  } else {
    res.status(200).json(data);
  }
}
/**
 *
 * @ongoingEvent Handles GET requests to retrieve events that are currently ongoing.
 */
async function ongoingEvent(req, res) {
  let data = await eventHandler.ongoingEvent(req.body);
  if (!data) {
    res.status(404).json({ err: 1, message: "Something went wrong" });
  } else {
    res.status(200).json(data);
  }
}
/**
 *
 * @futureEvent  Handles GET requests to retrieve events that are scheduled to happen in the future.
 */
async function futureEvent(req, res) {
  let data = await eventHandler.futureEvent(req.body);
  if (!data) {
    res.status(404).json({ err: 1, message: "Something went wrong" });
  } else {
    res.status(200).json(data);
  }
}
/**
 *
 * @pastEvent Handles GET requests to retrieve events that have already happened.
 */
async function pastEvent(req, res) {
  let data = await eventHandler.pastEvent(req.body);
  if (!data) {
    res.status(404).json({ err: 1, message: "Something went wrong" });
  } else {
    res.status(200).json(data);
  }
}
/**
 * 
 *@getFPNToken Handles POST requests to update the FPN token for an event.
 @req contain the ID of the event and the new FPN token
 */

async function getFPNToken(req, res) {
  try {
    const { id, token } = req.body;
    eventHandler.updateFPNToken(id, token);
  } catch (error) {
    console.log(error);
  }
}

const eventController = {
  postDataAdmin,
  getDataEvent,
  updateEvent,
  deleteEvent,
  getById,
  ongoingEvent,
  futureEvent,
  pastEvent,
  getFPNToken,
};
module.exports = { eventController };
