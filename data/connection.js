require('dotenv').config();
const mongoose = require('mongoose');
const db_url = process.env.DB_URL;

const connect = async () => {
    try {
        await mongoose.connect(db_url).then(() => {
            console.log(`Database hase connected!`)
        })
    } catch (error) {
        handleError(error);
    }
}


module.exports = connect;