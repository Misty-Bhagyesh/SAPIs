var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
    userName: String,
    email: String,
    password: String,
    type: Number,
    token: String
});
module.exports = mongoose.model('admin', AdminSchema)