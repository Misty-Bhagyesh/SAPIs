require('dotenv').config();

const mongoose = require('mongoose');
const db_url = process.env.DB_URL;

const connect = async () => {
    try {
        console.log('dburl::',db_url)
        await mongoose.connect(db_url).then(() => {
            console.log(`Database hase connected!`)
        })
    } catch (error) {
        console.error(`error on connecting database!`, error);
    }
}


module.exports = connect;