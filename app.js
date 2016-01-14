var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Configuration
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')

var db;
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/birds", function(err, database){
    if (err) { console.log(err) }
    db = database;
}); 


// Routes
app.get('/', function(req, res){
  res.render('index');
});

app.get('/sightings/new', function(req, res){
	res.render('form');
});

app.post('/sightings', function(req, res){
	console.log(req.body.sighting.location);
	db.collection('sightings').insert( {bird: req.body.sighting.bird, location: req.body.sighting.location,  date: req.body.sighting.date }, function(err, result){
		console.log(result);
		res.redirect('/');
	})
});

app.get('/api/sightings', function(req, res){
	db.collection('sightings').find({}).toArray(function(err, results){
		res.json(results);
	})
});


app.listen(process.env.PORT || 3000);
