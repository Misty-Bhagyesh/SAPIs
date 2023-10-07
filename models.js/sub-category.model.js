var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubCategorySchema = new Schema({
    id: String,
    categoryId: String,
    name: String,
    imagePath: String,
});
module.exports = mongoose.model('sub-categories', SubCategorySchema)