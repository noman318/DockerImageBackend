const easyinvoice = require('easyinvoice');
const fs=require('fs');
const easyInvoiceJsonDataModifier = require('../utils/easyInvoiceJsonData');

const invoiceGenerator=(payment,callback)=>{
try {
    let data=easyInvoiceJsonDataModifier(payment);
    // console.log('data', data)
    console.log('payment :>> ', payment.transactions[0]);
    easyinvoice.createInvoice(data, function (result) {
        /*  
        The 'result' variable will contain our invoice as a base64 encoded PDF
        Now let's save our invoice to our local filesystem so we can have a look!
        We will be using the 'fs' library we imported above for this.
        */
        fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
    });
    

} catch (error) {
    console.log(error);
}
}

module.exports={invoiceGenerator}