const sessions=require('express-session');
const MongoStore = require('connect-mongo');

const oneDay = 1000 * 60 * 60 * 24;
require('dotenv').config();

const session=sessions({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODBCON,
        ttl: 1 * 24 * 60 * 60,
        autoRemove: 'native'})
});

module.exports=session;