var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var endpoint = new Schema({
    endpoint: String
});

var EndPoint = mongoose.model('EndPoint', endpoint);

module.exports = EndPoint;
