const eventModel = require("../model/EventModel");
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
  ongoingEvent: async function (data) {
    let {filterlocation,filterartist,filterprice ,filterLanguage,name} = data;
    const filterObj = {};
    // const filterObj = {};
    if (filterLanguage.length>0) {
      filterObj.language = filterLanguage;
    }
    if (filterartist.length>0) {
      {
        filterObj.artist = filterartist;
      }
    } 
    if (filterlocation.length>0) {
      {
        filterObj.location = filterlocation;
      }
    }
    if(filterprice.length>0){
      // console.log(filterprice)
      {
        filterObj.price = filterprice;
      }
    }
  // {createdAt: { $gte: start },
  // future: false,...
    console.log(filterObj)
    try {
      let data = await eventModel.find({
        createdAt: { $gte: start },future: false,...filterObj}
      );
      console.log(data)
      return data;
    } catch (error) {
      return { err: 1, msg: error.message };
    }
  },
  futureEvent: async function (data) {
    let { language, artist, location,genre,name,format} = data;
    const filterObj = {};
    if (language) {
      {filterObj.language = language;}
    }
    if (name) {
      filterObj.name = { $regex: name, $options: "i" };
    }
    if (artist) {
      {
        filterObj.artist = artist;
      }
    } 
    if (location) {
      {
        console.log(location)
        filterObj.location = location;
      }
    }
    console.log(filterObj)
    try {
      let data = await eventModel.find({
        createdAt: { $gte: end },
        future: true,
        ...filterObj});
      console.log(data);
      return data;
    } catch (error) {
      return { err: 1, msg: error.message };
    }
  },
  pastEvent: async function (data) {
    let { language, artist, location,genre,name,format} = data;
    const filterObj = {};
    if (language) {
      {filterObj.language = language;}
    }
    if (name) {
      filterObj.name = { $regex: name, $options: "i" };
    }
    if (artist) {
      {
        filterObj.artist = artist;
      }
    } 
    if (location) {
      {
        console.log(location)
        filterObj.location = location;
      }
    }
    console.log(filterObj)
    try {
      let data = await eventModel.find({ createdAt: { $lt: start },...filterObj});
      console.log(data);
      return data;
    } catch (error) {
      return { err: 1, msg: error.message };
    }
  },
};
  //  CreatedAt:{gts:start,$lt:end}
  {}
module.exports = { eventHandler };
