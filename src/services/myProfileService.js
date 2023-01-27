const { authToken } = require("../middleware/authMiddleware");
const {userService} = require("../services/userService")
const UserModel = require("../model/User");
const Auth = require("../model/Auth")
const userProfileService = {
    getByid: async function (id) {
        try {
          let data = await Auth.findById(id);
          if (!data) {
            return { err: 1, msg: `User with id ${id} not found` };
          }
          return data;
        } catch (ex) {
          return { err: 1, msg: ex.message };
        }
      },

      updateByid: async function(id,requestbody) {
        try{
            const dataUser = await Auth.findByIdAndUpdate(id,requestbody);
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
