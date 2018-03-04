var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
 var Card = require('./card');

var RigSchema   = new Schema({
	identity: String,
	rig_id: String,
	rig_name: String,
	CPU: String,
	board: String,
	hash_rate: Number,
	power: Number,
	cards: [
			
				{card_id: Number,
				card_name: String,
				hash_rate: Number,
				temprature: Number,
				fan_speed: Number,
				power: Number}
			],
	createTime: {
        type: Date,
        default: Date.now
    }
});

var CardSchema   = new Schema({
	//identity: String，
	//_id: String，
	card_id: Number,
	card_name: String,
	hash_rate: Number,
	temprature: Number,
	fan_speed: Number,
	power: Number,
});

//mongoose.model('Card', CardSchema);
module.exports = mongoose.model('Rig', RigSchema);
