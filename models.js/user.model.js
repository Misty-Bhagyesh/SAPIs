var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    mobile: String,
    address_line1: String,
    address_line2: String,
    pincode: Number,
    city: String,
    state: String,
    token:String
});
module.exports = mongoose.model('users', UserSchema)