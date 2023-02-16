const mongoose = require("mongoose");
/**
 * this is the connection to mongodb atlas
 */
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODBCON);

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

module.exports = connectDB;
