const { seatSerives } = require("../services/seatService");

const availableSeat=async(req,res)=>{
    try {
        console.log('req.params.id', req.params.id)
        const data = await seatSerives.getAllSeatDetails(req.params.id)
        console.log('data-availableseats', data)
        return res.json(data)
    } catch (error) {
        console.log(error);
    }
}
const seatController = {
    availableSeat
}
module.exports=seatController