var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 8000));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log('server is running on port', app.get('port'));
});