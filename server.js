
var path = require('path');
var express = require('express');
var exphbrs = require('express-handlebars');
var app = express();

var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.engine('handlebars', exphbrs();

app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  res.status(200).render('', )
});

app.get('', function(req, res, next) {
});


app.get('/public/*', function (req, res) {
  res.status(200).sendFile(path.join(__dirname + 'public'));
});

app.get('*', function(req, res){
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
