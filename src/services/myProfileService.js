const { authToken } = require("../middleware/authMiddleware");
const {userService} = require("../services/userService")
const UserModel = require("../model/User");
const Auth = require("../model/Auth");
const User = require("../model/User");
const userProfileService = {
    getById: async function (id) {
      console.log(id);
        try {
          let data = await Auth.findById(id).populate("userId");
            console.log(data)
          if (!data) {
            return { err: 1, msg: `User with id ${id} not found` };
          }
          return data;
        } catch (ex) {
          return { err: 1, msg: ex.message };
        }
      },

      updateById: async function(id,requestbody) {
        try{
            const dataUser = await Auth.findByIdAndUpdate(id,requestbody);
            const eventUser= await User.findByIdAndUpdate(dataUser.userId,requestbody);
            if(!dataUser){
                return {err: 1, msg: `User with id ${id} not found`};
            }
            return { err: 0, msg: "Profile Updated"};
        }catch(ex){
            return {err: 1, msg: ex.message};
        }
      
}
}

module.exports = { userProfileService };
