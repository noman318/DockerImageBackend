const passport = require('passport');
const User = require('../model/User');
const googleStrategy = require('./googleStrategy');

passport.serializeUser((user,done)=>{
    done(null,{_id:user._id})
})

passport.deserializeUser((id,done)=>{

})
