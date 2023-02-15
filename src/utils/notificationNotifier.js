const axios = require('axios')

const notifier = async(title,message,token)=>{
    try{
        if(token){
            console.log("--token--",token)
            await axios.post('http://localhost:7899/event/notification',{
                title:title,
                message:message,
                token:token
            })
            .then(res=>{console.log("")})
            .catch(err=>{console.log(err)})
        }
    }catch(e){
        console.log(e)
    }
}

module.exports=notifier