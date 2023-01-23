const paypal=require('paypal-rest-sdk');

paypal.configure({
    mode: process.env.PAYPAL_MODE,
    client_id: process.env.PAYPAL_CLIENT,
    client_secret: process.env.PAYPAL_SECRET
});

const createPayment=(data, callback)=>{
    /*
    @param data: a JSON object containing information related to the total and items for the payment
    @param callback: a function that is called with the approval URL for the payment as a parameter
     */
    try {
        paypal.payment.create(data, function (error, payment) {
            if (error) {
                throw error;
            } else {
                /* If there is no error, the function iterates through the links returned in the payment object, looking for the one with a rel property of "approval_url." When it finds this link, it calls the callback function and passes in an object containing the URL.*/
                for(const element of payment.links){
                  if(element.rel === 'approval_url'){
                    callback({paymenturl:element.href})
                  }
                }
            }
          });
    } catch (error) {
        console.log(error);
    }
}

const executePayment=(paymentId,data,callback)=>{
    /*
    @param paymentId: the ID of the payment to execute
    @param data: a JSON object containing the details of the execution, such as the payer ID and transaction amount
    @param callback: a function that is called with the result of the payment execution*/
    try {

        paypal.payment.execute(paymentId, data, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                // console.log(JSON.stringify(payment));
                console.log(payment);
                if(payment.state=='approved'){
                    console.log('Seat Book Kijye');
                    callback({message:`Thanks for paying ${data.transactions[0].amount.total} USD`,paymentObject:payment})
                }
            }
        });
        
    } catch (error) {
        console.log(error);
    }
}

const paymentExecuter={createPayment,executePayment}

module.exports={
   paymentExecuter 
}
