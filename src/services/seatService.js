const EventModel = require("../model/EventModel")

const seatSerives={
    getAllSeatDetails:async function (id){
        try {
            const data=await EventModel.findById(id)
            return {seats:data.seats,seatAvailable:data.seatAvailable}
        } catch (error) {
            
        }
    }
}

module.exports={seatSerives}