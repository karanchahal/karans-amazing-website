var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EndPoint = new Schema({
    endpoint: String
});

export default EndPoint;
