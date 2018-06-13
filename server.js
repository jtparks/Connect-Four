var path = require('path');
var express = require('express');
var exphbrs = require('express-handlebars');
var bodyParser = require('body-parser');



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

app.get('/data', function(req, res, next) {
  var name = db.collection('name');
  var nameCursor = collection.find({});
  var highscores = db.collection('highscores');
  var scoreCursor = collection.find({});
  scoreCursor.toArray(function(err, scores) 
  {
    if (err)
    {
      res.status(500).send('Error fetching highscores from Database');
    }
    else 
    {
      res.status(200).render('scoreboard', {
        people: name,
        scores: highscores
       });
    }
  })
});

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

app.get('/', function(req, res) {
  res.status(200).render('gamepage');
});

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
