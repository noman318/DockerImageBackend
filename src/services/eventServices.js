const eventModel = require("../model/EventModel");
const endOfDay = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");
let currentDate = new Date();
let start = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate(),
  0,
  0,
  0
);
let end = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate(),
  23,
  59,
  59
);
const eventHandler = {
  PostData: async function (data) {
    try {
      return eventModel
        .create({
          ...data,
          startDate: startOfDay(new Date()),
          endDate: endOfDay(new Date()),
          futureDate: data.futureDate,
        })
        .then((res) => res)
        .catch((err) => err);
    } catch (error) {
      console.log(error);
    }
  },
  getAlldata: async function () {
    try {
      let dataEvent = await eventModel.find();
      return dataEvent;
    } catch (error) {
      console.log(error);
    }
  },
  deleteEvent: async function (id) {
    try {
      const dataEvent = await eventModel.findByIdAndDelete(id);
      if (!dataEvent) {
        return { err: 1, msg: `Event with id ${id} not found` };
      }

      return { err: 0, msg: "Event deleted" };
    } catch (ex) {
      return { err: 1, msg: ex.message };
    }
  },
  updateEvent: async function (id, requestbody) {
    try {
      const dataEvent = await eventModel.findByIdAndUpdate(id, requestbody);
      if (!dataEvent) {
        return { err: 1, msg: `Event with id ${id} not found` };
      }
      return { err: 0, msg: "Event updated" };
    } catch (ex) {
      return { err: 1, msg: ex.message };
    }
  },
  getByid: async function (id) {
    try {
      let dataEvent = await eventModel.findById(id);
      if (!dataEvent) {
        return { err: 1, msg: `Event with id ${id} not found` };
      }
      return dataEvent;
    } catch (ex) {
      return { err: 1, msg: ex.message };
    }
  },
  ongoingEvent: async function () {
    try {
      let data = await eventModel.find({
        createdAt: { $gte: start, $lt: end },
      });
      console.log(data);
      return data;
    } catch (error) {
      return { err: 1, msg: error.message };
    }
  },
  futureEvent: async function () {
    try {
      let data = await eventModel.find({
        createdAt: { $gte:end },
      });
      console.log(data);
      return data;
    } catch (error) {
      return { err: 1, msg: error.message };
    }
  },
  pastEvent: async function () {
    try {
      let data = await eventModel.find(
        { createdAt: { $lt: start },
      });
      console.log(data);
      return data;
    } catch (error) {
      return { err: 1, msg: error.message };
    }
  },
};

module.exports = { eventHandler };
