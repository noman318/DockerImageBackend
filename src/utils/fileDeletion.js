const { setTimeout } = require('timers');
const fs = require('fs');

const deleteFile=(filename)=>{

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
}

module.exports={deleteFile}