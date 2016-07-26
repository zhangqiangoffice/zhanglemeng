var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var favicon = require('serve-favicon');
var morgan = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/zhanglemeng';
var ablum = require('./routes/ablum');
var ajax = require('./routes/ajax');
var msapi = require('./routes/msapi');

app.set('port', 80);
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/static', express.static('public')); //指定静态文件夹
app.use(favicon('public/img/favicon.ico'));
app.use(morgan('log: :remote-addr [:date[clf]] :status (:response-time ms) :method :url')); //输出日志

app.use('/ablum', ablum);
app.use('/ajax', ajax);

app.get('/', function(req, res) {
    res.redirect('/ablum');
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