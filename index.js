var superagent = require('superagent');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', 3000);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res) {
  res.send('大家好，我叫张乐萌！');
});


app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://121.41.66.82:' +
    app.get('port') + ';press Ctrl-c to terminate.');
});