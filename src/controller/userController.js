const { userService } = require("../services/userService")

const getAllUserData = async(req,res)=>{
    try{
        const data = await userService.getAllUser()
        return res.status(200).json(data)

    }catch(e){
        console.log(e)
    }
}

const deactivateUser = async(req,res)=>{
    try{
        const {id} = req.body;
        const data = await userService.deactivateUser(id)
        return res.status(200).json(data)

    }catch(e){
        console.log(e)
    }
}

const getUserByName = async(req,res)=>{
    try{

        const {name} = req.body;
        const data = await userService.getUserByName(name)
        return res.status(200).json(data)

    }catch(e){
        console.log(e)
    }
}

const userController = {
    getAllUserData,
    deactivateUser,
    getUserByName
}

module.exports = userController