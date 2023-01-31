const { paymentInitiatorJson } = require("../services/paypalJsonService");
const { paymentExecuter } = require("../services/paypalPaymentService");

/*The eventBooking function handles the initial creation of a payment. It starts by calculating the total sum of the seats prices using a hardcoded array seatArray of seats. It then assigns this total sum to a session variable totalPrice.
It also imports two services createPaymentJsonService and createPayment to create a payment JSON object and to create a payment respectively. The function then calls the createPaymentJsonService with the seats array, success URL, cancel URL, and total price as parameters. This function returns a JSON object that is used to create a payment using the createPayment function.*/

const eventBooking = async (req, res) => {
  try {
    const { paymentData } = req.body;
    console.log("paymentData :>> ", paymentData);
    // const seatArray = [
    //     {
    //       name: "1",
    //       description: "S-1",
    //       price: 2,
    //       currency: "USD",
    //       quantity: 1,
    //       sku:"63d0c3d5522b08bc5413e2f4,63c6546d81818d0dab6b85bb"
    //     },
    //     {
    //       name: "2",
    //       description: "S-2",
    //       price: 2,
    //       currency: "USD",
    //       quantity: 1,
    //       sku:"63d0c3d5522b08bc5413e2f4,63c6546d81818d0dab6b85bb"
    //     },
    //     {
    //       name: "3",
    //       description: "S-3",
    //       price: 2,
    //       currency: "USD",
    //       quantity: 1,
    //       sku:"63d0c3d5522b08bc5413e2f4,63c6546d81818d0dab6b85bb"
    //     },
    //   ];

    console.log("req.useremail", req.session.userEmail);
    console.log("seatArray", req.session.seats);
    let totalSum = 0;
    console.log("totalSum", totalSum);
    for (let data of paymentData) {
      totalSum += parseInt(data.price);
    }

    req.session.totalPrice = totalSum;
    console.log("req.session.totalPrice :>> ", req.session.totalPrice);

    let data = paymentInitiatorJson.createPaymentJsonService(
      paymentData,
      `http://localhost:7899/success?total=${req.session.totalPrice}`,
      "http://localhost:7899/cancel",
      req.session.totalPrice
    );

    console.log(data);

    paymentExecuter.createPayment(data, (payment) => {
      console.log("payment:", payment);
      return res.json(payment);
    });
  } catch (error) {
    console.log(error);
  }
};

/*The successEventBooking function handles the successful completion of a payment. It starts by extracting the total amount, payer ID, and payment ID from the query parameters of the request.
It also imports two services executePaymentJsonService and executePayment to create a JSON object to execute the payment and to execute the payment respectively. */

const successEventBooking = (req, res) => {
  console.log("req.session.totalPrice", req.session.totalPrice);
  console.log("req.session.seats", req.session.seats);
  try {
    const totalAmount = req.query.total;
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const userId = "63d0c3d5522b08bc5413e2f4";
    const eventId = "63ce8f6786522c2609cf81a5";
    let data = paymentInitiatorJson.executePaymentJsonService(
      payerId,
      totalAmount
    );
    console.log(data);

    paymentExecuter.executePayment(
      paymentId,
      data,
      userId,
      eventId,
      (paypalResponse) => {
        return res.json(paypalResponse);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

/*The failedEventBooking function handles the case where the payment process is unsuccessful.*/
const failedEventBooking = (req, res) => {
  try {
    return res.json({ message: "Unable to pay" });
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
