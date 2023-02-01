const paypalItemListTransformer=(data)=>{
    const myData=[];
    for(let i of data){
        myData.push({
            name:i.seat_number+"",
            price:i.price,
            currency:"USD",
            quantity:1
        });
    }
    return myData;
}

module.exports=paypalItemListTransformer