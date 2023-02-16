const { paymentJson } = require("../utils/paymentJsonData");
/**
 * @description Generates a payment JSON object with given seat array, return URL, cancel URL, and total price
 * @param  seatArray - array of seats for the transaction
 * @param  return_url - URL to redirect the user to after successful transaction
 * @param cancel_url - URL to redirect the user to after cancelled transaction
 * @param  totalPrice - total amount to charge for the transaction
 * @returns  - payment JSON object
 */
const createPaymentJsonService = (
    seatArray,
    return_url,
    cancel_url,
    totalPrice
) => {
    paymentJson.create_payment_json.transactions[0].item_list.items = seatArray;
    paymentJson.create_payment_json.redirect_urls.return_url = return_url;
    paymentJson.create_payment_json.redirect_urls.cancel_url = cancel_url;
    paymentJson.create_payment_json.transactions[0].amount.total = totalPrice;

    return paymentJson.create_payment_json;
};

const executePaymentJsonService = (payerId, totalAmount) => {
    paymentJson.execute_payment_json.payer_id = payerId;
    paymentJson.execute_payment_json.transactions[0].amount.total = totalAmount;

    return paymentJson.execute_payment_json;
};

const paymentInitiatorJson = {
    createPaymentJsonService,
    executePaymentJsonService,
};
module.exports = { paymentInitiatorJson };
