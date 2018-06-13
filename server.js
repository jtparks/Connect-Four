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
        score: highscores
       });
    }
  })
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
