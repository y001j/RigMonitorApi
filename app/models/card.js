var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CardSchema   = new Schema({

	card_name: String,
	hash_rate: Number,
	temprature: Number,
	fan_speed: Number,
	power: Number
});

module.exports = mongoose.model('Card', CardSchema);