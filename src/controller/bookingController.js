const { bookingInformationHandler } = require("../services/bookingService");


async function myBooking(req,res){
    const {userId,eventId}=req.body;
    const {page}=req.query;
    console.log(page);
    data=await bookingInformationHandler.getBookingInfoByUserIdAndEventId(userId,eventId,Number(page))
    return res.json(data);
}
module.exports={myBooking}