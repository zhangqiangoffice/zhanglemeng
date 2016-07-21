var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', 80);
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

app.get('/', function(req, res) {
  // res.send('<p>大家好，我叫张乐萌！</p><img style="width:200px" src="/img/1.jpg">');
  res.render('album', {title: 'hey', message: 'hello ejs!'});
});


app.use(function(req, res) {
  res.status(404);
  res.send('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.send('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://121.41.66.82:' +
    app.get('port') + ';press Ctrl-c to terminate.');
});