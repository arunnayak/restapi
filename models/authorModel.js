var mongoose = require ('mongoose'),
    Schema = mongoose.Schema;

var authorModel = new Schema ({
    name:{type: String},
    age: {type: Number},
    country: {type: String},
});

module.exports = mongoose.model('Author', authorModel);