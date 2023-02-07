const User = require('../model/User');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')

const strategy = new GoogleStrategy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:'/auth/google/callback',
    userProfileURL:'https://www.googleapis.com/oauth2/v3/userinfo'
},
function(accessToken, refreshToken, profile, cb){
    console.log(profile);
    // const {id,name,photos}=profile;
    User.findOrCreate({firstName:profile.givenName,
    lastName:profile.familyName,
    username:profile.id,
    email:profile.email})
},function (err, user) {
    return cb(err, user)
})

module.exports=strategy;