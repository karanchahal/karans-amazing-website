var mongoose = require('mongoose');
var Schema = mongoose.Schema;
Promise = require('bluebird')

var endpoint = new Schema({
    endpoint: String
});

var EndPoint = mongoose.model('EndPoint', endpoint);

Promise.promisifyAll(EndPoint)
Promise.promisifyAll(EndPoint.prototype)

module.exports = EndPoint;
