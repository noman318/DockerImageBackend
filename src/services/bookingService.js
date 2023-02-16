const BookingSchema = require("../model/BookingModel");
const TransactionModel = require("../model/TransactionModel");
const eventModel = require("../model/EventModel");
/**
 *@description Function to store booking information in the database
 */
const bookingInformationHandler = {
    bookingInfoStoring: async function (payment) {
        try {
            bookingData = new BookingSchema({
                userId: payment.uid,
                eventId: payment.eventId,
                paymentId: payment.id,
                amount: payment.transactions[0].amount.total,
                transactionState: payment.state,
                payerName: payment.payer.payer_info.first_name,
                payerEmail: payment.payer.payer_info.email,
            });
            for (let item of payment.transactions[0].item_list.items) {
                bookingData.seatDetails.push(item);
            }
            bookingData.save();
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * @description Function to store transaction information in the database
     * @param  payment userId , eventId , paymentInfo
     */
    transactionsInfoStoring: async function (payment) {
        try {
            new TransactionModel({
                userId: payment.uid,
                eventId: payment.eventId,
                paymentInfo: payment,
            }).save();
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * @description Function to retrieve booking information for a user and event
     */

    getBookingInfoByUserIdAndEventId: async function (userId, eventId, page) {
        try {
            const perPage = 1;
            console.log("SKIP->perPage*page", Number(perPage * page));
            console.log("limit", perPage);
            const data = await BookingSchema.find({
                $and: [{ userId: userId }, { eventId: eventId }],
            })
                .populate(["userId", "eventId"])
                .skip(Number(perPage * page))
                .limit(Number(perPage));
            if (!data) return { err: 1, msg: `Event with id ${eventId} not found` };
            if (data) return { err: 0, data };
            else return false;
        } catch (error) {
            console.log(error);
        }
    },
    /**
     *@description Function to retrieve all bookings for a user
     */

    getAllBookings: async function (page, userId) {
        console.log("userId from service :>> ", userId);
        const perPage = 5;
        try {
            let total = await BookingSchema.find({ userId }).count();
            console.log("total :>> ", total);
            var totalPages = Math.ceil(total / perPage);
            var pageNumber = page == 0 ? 1 : page;
            var startFrom = (pageNumber - 1) * perPage;
            const data = await BookingSchema.find({ userId })
                .skip(Number(startFrom))
                .limit(Number(perPage))
                .populate("eventId");
            if (!data) return { err: 1, msg: `Event with id ${eventId} not found` };
            if (data) return { err: 0, data, totalPages };
            else return false;
        } catch (error) {
            console.log("error :>> ", error);
        }
    },

    bookingSeatById: async function (data) {
        try {
            for (let id of data.transactions[0].item_list.items) {
                console.log("id-- :>> ", id.sku);
                await eventModel.findById(data.eventId).update(
                    { "seats._id": id.sku },
                    {
                        $set: {
                            "seats.$.status": 1,
                        },
                    }
                );
            }
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = { bookingInformationHandler };
