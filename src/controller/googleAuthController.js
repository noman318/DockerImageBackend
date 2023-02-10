const googleAuth = require("../services/googleAuthService")

const googleAuthControllerService=async(req,res)=>{
    try{

        let data = await googleAuth.googleAuthService(req.body.credential)
        console.log("google-response",data)
        if(data){
            return res.status(201).json(data)
        }

    }catch(error){
        console.log(error)
    }
}

module.exports = googleAuthControllerService