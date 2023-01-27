const { bookingInformationHandler } = require("../services/bookingService");


async function myBooking(req,res){
    const {userId,eventId}=req.body;
    let {page}=req.query;

    // let userId='63d0c3d5522b08bc5413e2f4'
    // let eventId='63ce8f6786522c2609cf81a5'
    // console.log(page);
    // let data;
    // if(!page){
    //     data=await bookingInformationHandler.getBookingInfoByUserIdAndEventId(userId,eventId,page)
    //     return
    // }
    // if(page){
        // console.log("heii",Number(page));
        data=await bookingInformationHandler.getBookingInfoByUserIdAndEventId(userId,eventId,Number(page))
    // }
    
    // const data=await BookingModel.find({$and: [{userId: userId}, {eventId: eventId}]}).populate(["userId","eventId"])
    // console.log(data)
    return res.json(data);
}
module.exports={myBooking}