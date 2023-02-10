const { eventHandler } = require("../services/eventServices");
async function postDataAdmin(req, res) {
  let data = await eventHandler.PostData(req.body);
  if (!data) {
    res.status(404).json({ err: 1, message: "Please Provide Data" });
  } else {
    res.status(200).json(data);
  }
}
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

async function updateEvent(req, res) {
  let databody = req.body;
  let data = await eventHandler.updateEvent(req.params.id, databody);
  if (!data) {
    res.status(404).json({ err: 1, message: "data is not update" });
  } else {
    res.status(200).json(data);
  }
}

async function deleteEvent(req, res) {
  let data = await eventHandler.deleteEvent(req.params.id);
  if (!data) {
    res.status(404).json({ err: 1, message: "id is wrong" });
  } else {
    res.status(200).json(data);
  }
}
async function getById(req, res) {
  //   res.send(req.params.id)
  let data = await eventHandler.getByid(req.params.id);
  if (!data) {
    res.status(404).json({ err: 1, message: "Id is Wrong" });
  } else {
    res.status(200).json(data);
  }
}
async function ongoingEvent(req,res){
  // console.log(req.body)
  let data = await eventHandler.ongoingEvent(req.body);
  if (!data) {
    res.status(404).json({ err: 1, message: "Something went wrong" });
  } else {
    res.status(200).json(data);
    // console.log(data);
  }
}
async function futureEvent(req,res){
  let data = await eventHandler.futureEvent(req.body);
  if (!data) {
    res.status(404).json({ err: 1, message: "Something went wrong" });
  } else {
    res.status(200).json(data);
    // console.log(data);
  }
}
async function pastEvent(req,res){
  let data=await eventHandler.pastEvent(req.body);
  if (!data) {
    res.status(404).json({ err: 1, message: "Something went wrong" });
  } else {
    res.status(200).json(data);
    // console.log(data);
  }
}

async function getFPNToken(req,res){
  try {
    const {id,token}=req.body;
    eventHandler.updateFPNToken(id,token)
    console.log({ id,token})
    
  } catch (error) {
    console.log(error)
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
  getFPNToken
};
module.exports = { eventController };
