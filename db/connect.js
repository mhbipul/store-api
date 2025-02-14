const mongoose = require('mongoose')

const conectDB = (url)=>{
  return mongoose.connect(url)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err);
  });
}

module.exports = conectDB
