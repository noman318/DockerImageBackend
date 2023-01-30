const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema(
  {
    paymentId:{
        type:String,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    eventId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "event",
    },
    paymentInfo:{
        type:Object
    }
  });

  module.exports=mongoose.model('transaction',TransactionSchema)