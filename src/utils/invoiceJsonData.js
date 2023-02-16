let invoice = {
  shipping: {
    name: "John Doe",
    address: "1234 Main Street",
    city: "San Francisco",
    state: "CA",
    country: "US",
    postal_code: 94111
  },
  items: [
    {
      item: "TC 100",
      description: "Toner Cartridge",
      quantity: 2,
      amount: 6000
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    }
  ],
  subtotal: 8000,
  paid: 0,
  invoice_nr: 1234
};
/**
* @description Modifies an invoice object by updating its fields with data from a PayPal transaction.
* @param data - The data from a PayPal transaction.
* @returns The modified invoice object.
*/
const invoiceDataModifier = (data) => {
  invoice.shipping.name = data.transactions[0].item_list.shipping_address.recipient_name
  invoice.shipping.address = data.transactions[0].item_list.shipping_address.line1
  invoice.shipping.city = data.transactions[0].item_list.shipping_address.city
  invoice.shipping.state = data.transactions[0].item_list.shipping_address.state
  invoice.shipping.country = data.transactions[0].item_list.shipping_address.country_code
  invoice.shipping.postal_code = data.transactions[0].item_list.shipping_address.postal_code
  invoice.items = data.transactions[0].item_list.items
  invoice.subtotal = data.transactions[0].amount.total
  invoice.invoice_nr = data.id.split('-')[1]

  return invoice
}

module.exports = { invoiceDataModifier }