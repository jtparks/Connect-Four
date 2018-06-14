var path = require('path');
var express = require('express');
var exphbrs = require('express-handlebars');
var bodyParser = require('body-parser');
var handles = require('handlebars');
var NumberInt= require('mongoose-int32');

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



app.post('/addScore', function(req, res, next)
{
	console.log(req.body);
	var people=req.body.person;
	console.log(people);
	if(req.body)
	{
		var peopleCollection=mongoDB.collection('random');
		peopleCollection.find({person: people}).toArray(function(err, list)
		{
		console.log(list);
			if (list)
			{
				var scores = list[0].score;
				scores++;
				peopleCollection.updateOne(
					{person: people},
					{$set: {score : scores}},
					function(err, result)
					{
						console.log(err);
						if(err)
						{
							console.log("stuff");
							res.status(500).send("error inserting into db.");
						}
						else
						{
							console.log("not stuff");
							if(result.matchedCount>0)
							{
								res.status(200).end();
							}	
							else
							{
								next();
							}
						}
					});
			}
				else 
				{
					peopleCollection.update(
						{person: people},
						{$push : {score: 1}},
						function(err, result) 
						{
							console.log(err);
							if(err)
							{
								console.log("tuff2");
								res.status(500).send("error inserting into db.");
							}
							else
							{
									res.status(200).end();
							}
						}
					);
				}			
		});
	}
	else
	{
		res.status(400).send("Error with JSON")
		
	}

});

app.get('/', function(req, res, next) {
	var people = db.collection('random');
	people.find().toArray(function(err, list)
	{
		if(err){
			res.status(500).send("Error fetching people data");
		}
		else if(list.length>0){
			console.log(list);
			res.status(200).render('gamepage', {data: list});
		}	
		else{
			console.log("next");
			next();
		}
	});
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
