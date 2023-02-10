const { bookingInformationHandler } = require("../services/bookingService");


async function myBooking(req,res){
    const {userId,eventId}=req.body;
    const {page}=req.query;
    console.log(page);
    data=await bookingInformationHandler.getBookingInfoByUserIdAndEventId(userId,eventId,page)
    return res.json(data);
}

async function getAllBookings(req,res){
    const {userId} = req.body
    console.log('userId :>> ', userId);
    data=await bookingInformationHandler.getAllBookings((Number(req.body.page)),userId)
    return res.json(data);
}

module.exports={myBooking,getAllBookings}