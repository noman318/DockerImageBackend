const mongoose = require("mongoose");
const BookingSchema = new mongoose.Schema(
  {
    userId:{
        // type:String,
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    eventId:{
        // type:String,
        type: mongoose.Schema.Types.ObjectId,
        ref: "event",
    },
    seatDetails:[
        
    ],
    paymentId:{
        type:String,
    },
    amount:{
        type:String,
    },
    transactionState:{
        type:String
    },
    payerName:{
        type:String
    },
    payerEmail:{
        type:String
    }
  });

  module.exports=mongoose.model('booking',BookingSchema)