var path = require('path');
var express = require('express');
var exphbrs = require('express-handlebars');
var bodyParser = require('body-parser');



var MongoClient=require('mongodb').MongoClient;
var app = express();

var mongoHost='classmongo.engr.oregonstate.edu';
var mongoPort= process.env.MONGO_PORT || '37691' ;
var mongoUsername='cs290_bhutania';
var mongoPassword='cs290_bhutania';
var mongoDBName=process.env.MONGO_DB_NAME;

//var mongoURL = "mongo ds036079.mlab.com:36079/thecorrectteam -u bhutania -p asdfgh1"

var mongoURL="mongodb://" + mongoUsername + ":" + mongoPassword + "@" + "ds036079.mlab.com:36079/thecorrectteam";

var mongoDB=null;

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static('public'));

app.engine('handlebars', exphbrs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  res.status(200).render('gamepage');
});

/*app.get('', function(req, res, next) {
});


app.get('/public/*', function (req, res) {
  res.status(200).sendFile(path.join(__dirname + 'public'));
});*/

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
