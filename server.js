var path = require('path');
var express = require('express');
var exphbrs = require('express-handlebars');
var bodyParser = require('body-parser');

var stuff = null;

var MongoClient=require('mongodb').MongoClient;
var app = express();

var mongoHost='classmongo.engr.oregonstate.edu';
var mongoPort= process.env.MONGO_PORT || '27017' ;
var mongoUser='cs290_bhutania';
var mongoPassword='cs290_bhutania';
var mongoDBName='cs290_bhutania';

var mongoURL='mongodb://' + mongoUser + ':' + mongoPassword + '@' +
mongoHost + ':' + mongoPort + '/' + mongoDBName;

var mongoDB=null;

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static('public'));

app.engine('handlebars', exphbrs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');


/*
app.post('/data/:rank', function(req, res, next){
	var data=req.params.person.toLowerCase();
	if(req.rank && req.rank.name &&req.rank.score){
		var leaderboard={
			name: req.rank.name,
			score: req.rank.score
		};
		var dataCollection=mongoDB.collection('data');
		dataCollection.updateOne(
			{rank: rank},
			{person: person},
			{score: score},
			function(err, result){
				if(err){
					res.status(500).send("error inserting into db.");
				}
				else{
					if(result.matchedCount>0){
					res.status(200).endl();
					}	
					else{
						next();
					}
				}
		
			}
		);
	}
	else{
		res.status(400).send("Error with JSON")
		
	}

});
*/
app.get('/', function(req, res) {
	res.status(200).render('gamepage');	

});

app.get('/ranks', function(req, res, next) {
	//  var name = mongoDB.collection('ranks');
	//  var nameCursor = collection.find({});
	var person = {
			people: req.body.people,
			score: req.body.scores
	};
		var dataBase = mongoDB.collection('test');
		dataBase.updateOne(
			{$push: {person: person}},
		function(err, result)
		{
			if (err)
			{
			res.status(500).send("Error inserting person into DB");
			}

			else {
				if(result.matchedCount>0){
					res.status(200).end();
				}
				else{
					next();					
				}							
			}
		});
	});
	//  var scoreCursor = collection.find({});
/*	app.get('/ranks/:person', function(req, res, next) {
		var person = req.params.person.toLowerCase();				
		var peopleCollection = mongoDB.collection();
		peopleCollection.find({person: name}).toArray(function(err, personOne) {
			if(err){
				res.status(500).send("Error fetching people from DB")				
			}
			else if(personOne.length > 0)
			{
				res.status(200).render(''{
					person: personOne
				});
			}				
			else {
				next();				
			}
		});					
	}); */

app.get('*', function(req, res){
  res.render('404');
});

MongoClient.connect(mongoURL, function(err, client){
	if(err){
		throw err;
	}
	db=mongoDB=client.db(mongoDBName);
	app.listen(port, function () {
	  console.log("== Server is listening on port", port);
	});
})
