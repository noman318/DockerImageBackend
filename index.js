const express = require("express");
const app = express();
const env = require("dotenv").config();
const PORT = process.env.PORT;
const path = require("path");
const mongoose = require("mongoose");
const expHbs = require("express-handlebars");
app.use("/static", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine("handlebars", expHbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

mongoose.set("strictQuery", true);
const connectDB = require("./src/utils/db");

connectDB();

const userRoute = require("./src/routes/loginRouter");
app.use("/", userRoute);

app.listen(PORT, (err) => {
  if (err) throw err;
  else console.log(`Server is run on ${PORT}`);
});
