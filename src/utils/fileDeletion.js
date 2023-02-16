const { setTimeout } = require('timers');
const fs = require('fs');
/**
 * Deletes a file with the given filename after a specified delay.
 * @param filename The name of the file to delete.
 */

const deleteFile = (filename) => {
  try {
    const filePath = `./invoiceFiles/${filename}`;
    const delay = 30;

    const timeout = setTimeout(() => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`${filePath} was deleted`);
        }
      });
    }, delay * 1000);
  } catch (error) {
    console.log(error)
  }
}
module.exports = { deleteFile }