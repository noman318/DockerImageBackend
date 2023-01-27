const BookingSchema = require("../model/BookingModel");
const TransactionModel = require("../model/TransactionModel");


const bookingInformationHandler={
    bookingInfoStoring:async function(payment){
        try {
            bookingData=new BookingSchema({
                userId:payment.uid,
                eventId:payment.eventId,
                paymentId:payment.id,
                amount:payment.transactions[0].amount.total,
                transactionState:payment.state,
                payerName:payment.payer.payer_info.first_name,
                payerEmail:payment.payer.payer_info.email
              })
              for(let item of payment.transactions[0].item_list.items){
                bookingData.seatDetails.push(item)
              }
              bookingData.save()
        } catch (error) {
            console.log(error);
        }
    },
    transactionsInfoStoring:async function(payment){
        try {
            new TransactionModel({
                userId:payment.uid,
                eventId:payment.eventId,
                paymentInfo:payment
            }).save()
            
        } catch (error) {
            console.log(error);
        }
    },

    getBookingInfoByUserIdAndEventId: async function(userId,eventId,page){
        try {
            const perPage=1;
            console.log('SKIP->perPage*page', Number(perPage*page))
            console.log('limit', perPage)
            const data=await BookingSchema.find({$and: [{userId: userId}, {eventId: eventId}]}).populate(["userId","eventId"]).skip(Number(perPage * page)).limit(Number(perPage))
            if(!data) return { err: 1, msg: `Event with id ${eventId} not found` };
            if(data) return { err: 0, data }
            else return false;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports={bookingInformationHandler}