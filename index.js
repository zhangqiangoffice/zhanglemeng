var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var favicon = require('serve-favicon');
var morgan = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/zhanglemeng';

//路由控制
// var ablum = require('./routes/ablum');
// var ajax = require('./routes/ajax');
// var api = require('./routes/api');
// var excel = require('./routes/excel');
// var ace = require('./routes/ace');


var report = require('./routes/report');


morgan.token('date',function(){return new Date().toLocaleString();});


app.set('port', 3010);
app.set('views', './views');
app.set('view engine', 'ejs');

// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1');
//     // res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/static', express.static('public')); //指定静态文件夹
app.use(favicon('public/img/favicon.ico'));
app.use(morgan('log: :remote-addr [:date[iso]] :status (:response-time ms) :method :url')); //输出日志

// app.use('/ablum', ablum);
// app.use('/ajax', ajax);
// app.use('/api', api);
// app.use('/excel', excel);
app.use('/report', report);


app.get('/', function(req, res) {
    res.redirect('/report');
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
    console.log('Express started on http://localhost:' +
    app.get('port') + ';press Ctrl-c to terminate.');
});