const { bookingInformationHandler } = require("../services/bookingService");
const { paymentInitiatorJson } = require("../services/paypalJsonService");
const { paymentExecuter } = require("../services/paypalPaymentService");
const paypalItemListTransformer = require("../utils/paypalItemListConverter");
/**
 *@eventBooking The eventBooking function handles the initial creation of a payment. It starts by calculating the total sum of the seats prices using a hardcoded array seatArray of seats. It then assigns this total sum to a session variable totalPrice.
 *It also imports two services createPaymentJsonService and createPayment to create a payment JSON object and to create a payment respectively. The function then calls the createPaymentJsonService with the seats array, success URL, cancel URL, and total price as parameters. This function returns a JSON object that is used to create a payment using the createPayment function
 @param req the object of the payment details 
 */

const eventBooking = async (req, res) => {
  try {
    const paymentData = req.body;


    let seatData = paypalItemListTransformer(paymentData);
    console.log("seatData", seatData);
    let totalSum = Number(seatData[0].price) * seatData.length;

    let data = paymentInitiatorJson.createPaymentJsonService(
      seatData,
      `http://localhost:7899/success?total=${totalSum}&uid=${paymentData[0].userId}&eventId=${paymentData[0].eventId}`,
      `http://localhost:7899/cancel?total=${totalSum}&uid=${paymentData[0].userId}&eventId=${paymentData[0].eventId}`,
      totalSum
    );

    paymentExecuter.createPayment(data, (payment) => {
      console.log("payment:", payment);
      return res.json(payment);
    });
  } catch (error) {
    console.log(error);
  }
};
/**
 *@successEventBooking The successEventBooking function handles the successful completion of a payment. It starts by extracting the total amount, payer ID, and payment ID from the query parameters of the request.
 * It also imports two services executePaymentJsonService and executePayment to create a JSON object to execute the payment and to execute the payment respectively.
 * @param req total Amount , payerID , paymentId , userId , eventId
 */
const successEventBooking = (req, res) => {
  try {
    const totalAmount = req.query.total;
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const userId = req.query.uid;
    const eventId = req.query.eventId;
    let data = paymentInitiatorJson.executePaymentJsonService(
      payerId,
      totalAmount
    );

    paymentExecuter.executePayment(
      paymentId,
      data,
      userId,
      eventId,
      (paypalResponse) => {
        return res.redirect("http://localhost:3000/mybooking");
      }
    );
  } catch (error) {
    console.log(error);
  }
};

/**
 *@failedEventBooking The failedEventBooking function handles the case where the payment process is unsuccessful.
 */
const failedEventBooking = (req, res) => {
  try {
    const totalAmount = req.query.total;
    const userId = req.query.uid;
    const eventId = req.query.eventId;
    const obj = {
      state: "cancelled",
      transactions: [
        {
          amount: {
            total: totalAmount,
            currency: "USD",
          },
        },
      ],
      uid: userId,
      eventId: eventId,
    };
    bookingInformationHandler.transactionsInfoStoring(obj);
    return res.redirect(
      `http://localhost:3000/eventdetails/${eventId}?notification=perform`
    );
  } catch (error) {
    console.log(error);
  }
};

const eventBookingExecutor = {
  eventBooking,
  successEventBooking,
  failedEventBooking,
};

module.exports = {
  eventBookingExecutor,
};
