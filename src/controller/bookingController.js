const { bookingInformationHandler } = require("../services/bookingService");

/**
 * 
 *@myBooking  function receives a request object and extracts the eventId value and page value from its body

 * @returns  getBookingInfoByUserIdAndEventId function from the bookingInformationHandler object with these values and waits for it to complete. The resulting data is then sent back as a JSON response.
 */
async function myBooking(req, res) {
    const { userId, eventId } = req.body;
    const { page } = req.query;
    console.log(page);
    data = await bookingInformationHandler.getBookingInfoByUserIdAndEventId(
        userId,
        eventId,
        page
    );
    return res.json(data);
}
/**
 *
 * @getAllBookings function receives a request object and extracts the userId value and page value from its body
 * @returns getAllBookings function from the bookingInformationHandler object with these values and waits for it to complete. The resulting data is then sent back as a JSON response.
 */
async function getAllBookings(req, res) {
    const { userId } = req.body;
    console.log("userId :>> ", userId);
    data = await bookingInformationHandler.getAllBookings(
        Number(req.body.page),
        userId
    );
    return res.json(data);
}

module.exports = { myBooking, getAllBookings };
