const { paymentJson } = require("../utils/paymentJsonData");

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
