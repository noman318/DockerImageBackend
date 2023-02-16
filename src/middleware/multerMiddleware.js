const multer = require("multer");
const path = require("path");

/**
 * @description Set up the storage engine for multer to store uploaded files
 */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    let fileExtension = path.extname(file.originalname);
    cb(
      null,
      file.fieldname +
      "-" +
      Date.now() +
      Math.round(Math.random() * 1e9) +
      fileExtension
    );
  },
});
/**
 * @description Set up multer middleware to handle file uploads and filter files
 */
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file) {
      cb(next());
    }
    if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("Only png and jpg format allowed"));
    }
  },
});

module.exports = upload;
