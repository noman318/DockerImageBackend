const create_payment_json = {
  intent: "sale",
  payer: {
    payment_method: "paypal",
  },
  note_to_payer: "Not refundable",
  redirect_urls: {
    return_url: "",
    cancel_url: "",
  },
  transactions: [
    {
      item_list: {
        items: "",
      },
      amount: {
        currency: "USD",
        total: "",
      },
      description: "event booking",
    },
  ],
};

const execute_payment_json = {
  payer_id: "",
  transactions: [
    {
      amount: {
        currency: "USD",
        total: "",
      },
    },
  ],
};

<<<<<<< HEAD
const paymentJson = { create_payment_json, execute_payment_json };
module.exports = { paymentJson };
=======
const paymentJson={create_payment_json,execute_payment_json}
module.exports={paymentJson}
>>>>>>> 6bf53bec919750cda2244eda43c5bd71ac6c0a9f
