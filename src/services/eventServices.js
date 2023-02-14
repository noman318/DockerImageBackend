const eventModel = require("../model/EventModel");
const firebasePushNotificationModel = require("../model/FirebasePushNotificationModel");
var fs = require("fs");
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
var seats = [];
const eventHandler = {
  PostData: async function (data) {
    try {
      newEventModel = new eventModel(data);
      for (let index = 0; index < newEventModel.seatAvailable; index++) {
        newEventModel.seats.push({
          seat_number: index + 1,
          status: 0,
          price: newEventModel.price,
        });
      }
      newEventModel.save();

      return { err: 0, message: "Event added succesfully" };
    } catch (error) {
      return { err: 1, message: error };
    }
  },
  getAlldata: async function (data) {
    let filterObjname = {};
    const perPage = 10;
    const { name = "" } = data;
    if (name !== "") {
      filterObjname.name = name;
    }
    try {
      let total = await eventModel.find({ ...filterObjname }).count();
      var pages = Math.ceil(total / perPage);
      var pageNumber = data.page == 0 ? 1 : data.page;
      var startFrom = (pageNumber - 1) * perPage;
      let dataEvent = await eventModel
        .find({ ...filterObjname })
        .skip(Number(startFrom))
        .limit(Number(perPage));
      return {
        pages: total,
        data: dataEvent,
      };
    } catch (error) {
      return { err: 1, message: error };
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
  updateImageEvent: async function (id) {
    try {
      const dataEvent1 = await eventModel.findByIdAndUpdate(id, { file: "" });
      if (!dataEvent1) {
        return { err: 1, msg: `Event with id ${id} not found` };
      }
      let data = await eventModel.findById(id);
      fs.unlink(`src/uploads/${data.image.substring(29)}`);
    } catch (err) {
      return { err: 1, msg: err.message };
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
  ongoingEvent: async function (data) {
    let {
      filterlocation,
      filterartist,
      filterprice,
      filterLanguage,
      page,
      name = "",
    } = data;
    const filterObj = {};
    // console.log("name"+name)
    const perPage = 10;
    console.log(filterLanguage);
    if (filterLanguage.length > 0) {
      filterObj.language = filterLanguage;
    }
    if (filterartist.length > 0) {
      {
        filterObj.artist = filterartist;
      }
    }
    if (filterlocation.length > 0) {
      {
        filterObj.location = filterlocation;
      }
    }
    if (filterprice.length > 0) {
      // console.log(filterprice)
      {
        filterObj.price = filterprice;
      }
    }
    if (name.length > 0) {
      {
        filterObj.name = name;
      }
    }
    // createdAt: { $gte: start },
    // future: false,
    // console.log(filterObj);
    var total = await eventModel
      .find({
        future: false,
        ...filterObj,
        name: name,
      })
      .count();
    try {
      var pages = Math.ceil(total / perPage);
      var pageNumber = page == null ? 1 : page;
      var startFrom = (pageNumber - 1) * perPage;
      let data = await eventModel
        .find({
          future: false,
          ...filterObj,
        })
        .skip(Number(startFrom))
        .limit(Number(perPage));
      return { data, pages: pages };
    } catch (error) {
      return { err: 1, msg: error.message };
    }
  },
  futureEvent: async function (data) {
    let {
      filterlocation,
      filterartist,
      filterprice,
      filterLanguage,
      page,
      name = "",
    } = data;
    const perPage = 10;
    const filterObj = {};
    if (filterLanguage.length > 0) {
      filterObj.language = filterLanguage;
    }
    if (filterartist.length > 0) {
      {
        filterObj.artist = filterartist;
      }
    }
    if (filterlocation.length > 0) {
      {
        filterObj.location = filterlocation;
      }
    }
    if (filterprice.length > 0) {
      // console.log(filterprice)
      {
        filterObj.price = filterprice;
      }
    }
    if (name !== "") {
      {
        filterObj.name = name;
      }
    }
    var total = await eventModel
      .find({
        future: false,
        ...filterObj,
      })
      .count();
    // console.log(filterObj);
    try {
      var pages = Math.ceil(total / perPage);
      var pageNumber = page == null ? 1 : page;
      var startFrom = (pageNumber - 1) * perPage;
      let data = await eventModel
        .find({
          future: true,
          ...filterObj,
        })
        .skip(Number(startFrom))
        .limit(Number(perPage));
      // console.log(data);
      return { data, pages: pages };
    } catch (error) {
      return { err: 1, msg: error.message };
    }
  },
  pastEvent: async function (data) {
    let {
      filterlocation,
      filterartist,
      filterprice,
      filterLanguage,
      page,
      name = "",
    } = data;
    const perPage = 10;
    const filterObj = {};
    if (filterLanguage.length > 0) {
      filterObj.language = filterLanguage;
    }
    if (filterartist.length > 0) {
      {
        filterObj.artist = filterartist;
      }
    }
    if (filterlocation.length > 0) {
      {
        filterObj.location = filterlocation;
      }
    }
    if (filterprice.length > 0) {
      // console.log(filterprice)
      {
        filterObj.price = filterprice;
      }
    }
    if (name !== "") {
      {
        filterObj.name = name;
      }
    }
    var total = await eventModel
      .find({
        future: false,
        ...filterObj,
      })
      .count();
    try {
      var pages = Math.ceil(total / perPage);
      var pageNumber = page == null ? 1 : page;
      var startFrom = (pageNumber - 1) * perPage;
      let data = await eventModel
        .find({ createdAt: { $lt: start }, ...filterObj })
        .skip(Number(startFrom))
        .limit(Number(perPage));
      // console.log(data);
      return { data, pages: pages };
    } catch (error) {
      return { err: 1, msg: error.message };
    }
  },
  updateFPNToken: async function (id, token) {
    try {
      let data = await firebasePushNotificationModel.findOne({ userId: id });
      if (data) {
        console.log("---", data.firebaseDeviceToken);
        await firebasePushNotificationModel.updateOne(
          { userId: id },
          { $set: { firebaseDeviceToken: token } }
        );
      }

      if (!data) {
        fpn = new firebasePushNotificationModel({
          userId: id,
          firebaseDeviceToken: token,
        });
        fpn.save();
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = { eventHandler };
