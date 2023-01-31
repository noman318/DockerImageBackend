const { setTimeout } = require('timers');
const fs = require('fs');

const deleteFile=(filename)=>{
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
module.exports={deleteFile}