var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OTPSchema = new Schema({
    otp: Number,
    mobile: String,
    createdAt: Date
});
module.exports = mongoose.model('otp', OTPSchema)