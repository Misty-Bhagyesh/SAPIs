var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    id: String,
    name: String,
    imagePath: String,
});
module.exports = mongoose.model('categories', CategorySchema)