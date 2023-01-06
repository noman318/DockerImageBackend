const express = require("express");
const app = express();
const env = require("dotenv").config();
const PORT = process.env.PORT;
const path = require("path");
const mongoose = require("mongoose");
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.set("strictQuery", true);

mongoose
  .connect("mongodb://localhost:27017/testevent")
  .then((res) => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error : " + err));

const login = require("./src/routes/loginrouter");
app.use("/login", login);

app.get("/", (req, res) => {
  res.send("Hello india");
});

app.listen(PORT, (err) => {
  if (err) throw err;
  else console.log(`Server is run on ${PORT}`);
});
