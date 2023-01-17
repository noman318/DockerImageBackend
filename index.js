const express = require("express");
const app = express();
const env = require("dotenv").config();
const PORT = process.env.PORT;
const path = require("path");
const mongoose = require("mongoose");
app.use("/static", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.set("strictQuery", true);
const connectDB = require("./src/utils/db");

connectDB();

const userRoute = require("./src/routes/loginrouter");
app.use("/", userRoute);

app.listen(PORT, (err) => {
  if (err) throw err;
  else console.log(`Server is run on ${PORT}`);
});
