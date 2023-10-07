require('dotenv').config();
const mongoose = require('mongoose');
const db_url = process.env.DB_URL;

const connect = function () {
    mongoose.connect(db_url).then((res)=>{
        console.log(`Database hase connected!`)
    }).catch(err=>{
        console.error(`error on connecting database!`);
    });
  
}

module.exports = connect;