
var path = require('path');
var express = require('express');
var exphbrs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/data')

app.use(express.static('public'));


app.engine('handlebars', exphbrs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  res.status(200).render('gamepage');
});

//app.get('', function(req, res, next) {
//});


/*app.get('/public/*', function (req, res) {
  res.status(200).sendFile(path.join(__dirname + 'public'));
});*/

app.get('*', function(req, res){
  res.render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
