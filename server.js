// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8081; // set our port

// DATABASE SETUP
var mongoose   = require('mongoose');
mongoose.connect('mongodb://97.64.19.225:27017/RestAPI'); // connect to our database

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

// Rig models lives here
 var Bear     = require('./app/models/bear');

 var Rig = require('./app/models/rig');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		
		var bear = new Bear();		// create a new instance of the Bear model
		bear.name = req.body.name;  // set the bears name (comes from the request)
		console.log(bear.name);
		bear.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Bear created!' });
		});

		
	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);

			res.json(bears);
		});
	});

// on routes that end in /rigs
// ----------------------------------------------------
router.route('/rigs')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		
		var rig = new Rig();		// create a new instance of the Bear model

		rig.identity = req.body.identity;  // set the bears name (comes from the request)
		rig.rig_id = req.body.rig_id;
		rig.rig_name = req.body.rig_name;
		rig.CPU = req.body.CPU;
		rig.board = req.body.board;
		rig.power = req.body.power;
		for(var i=0;i<req.body.cards.length;i++){
			var card = Object.create(null);
			card.card_id = req.body.cards[i].card_id;
			card.card_name = req.body.cards[i].card_name;
			card.hash_rate = req.body.cards[i].hash_rate;
			card.temprature = req.body.cards[i].temprature;
			card.fan_speed = req.body.cards[i].fan_speed;
			card.power = req.body.cards[i].power;
			rig.cards.push(card);
		}

		console.log(rig.rig_name);
		rig.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Rig created!' });
		});		
	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		Rig.find(function(err, rigs) {
			if (err)
				res.send(err);

			res.json(rigs);
		});
	});
// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

	// get the bear with that id
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})

	// update the bear with this id
	.put(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {

			if (err)
				res.send(err);

			bear.name = req.body.name;
			bear.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Bear updated!' });
			});

		});
	})

	// delete the bear with this id
	.delete(function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
