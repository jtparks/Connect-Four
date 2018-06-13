
var path = require('path');
var express = require('express');
var exphbrs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient=require('mongodb').MongoClient;
var app = express();

var mongoHost=process.env.MONGO_HOST;
var mongoPort=process.env.MONGO_PORT || '27017' ;
var mongoUsername='Bhutania';
var mongoPassword='asdfgh1';
var mongoDMName=process.env.MONGO_DB_NAME;

var mongoURL="mongodb://<dbuser>:<dbpassword>@ds036079.mlab.com:36079/thecorrectteam";

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

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
