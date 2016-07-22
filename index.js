var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/zhanglemeng';

var insertDocuments = function(db, callback) {
  var photos = [
        {path: '/static/img/1.jpg', date: '2016-06-19'},
        {path: '/static/img/2.jpg', date: '2016-07-02'},
        {path: '/static/img/3.jpg', date: '2016-06-19'},
        {path: '/static/img/4.jpg', date: '2016-06-19'},
        {path: '/static/img/5.jpg', date: '2016-06-09'},
        {path: '/static/img/6.jpg', date: '2016-06-02'},
        {path: '/static/img/7.jpg', date: '2016-05-27'},
        {path: '/static/img/8.jpg', date: '2016-05-02'},
        {path: '/static/img/9.jpg', date: '2016-05-02'},
        {path: '/static/img/10.jpg', date: '2016-05-02'},
        {path: '/static/img/11.jpg', date: '2016-04-03'},
        {path: '/static/img/12.jpg', date: '2016-03-27'},
        {path: '/static/img/13.jpg', date: '2016-03-24'},
        {path: '/static/img/14.jpg', date: '2016-03-24'},
        {path: '/static/img/15.jpg', date: '2016-03-24'},
        {path: '/static/img/16.jpg', date: '2016-03-24'},
        {path: '/static/img/3D741B7C63C01C511A5734C4EF37F1D3.jpg', date: '2016-07-22'},
        {path: '/static/img/BFF59E1C2D178C15D476AD807DDCA199.jpg', date: '2016-07-22'}
    ];

  var collection = db.collection('ablum');
  collection.insertMany(photos, function(err, result) {
    callback(result);
  });
};

var findLastPhotos = function(db, callback) {
    var collection = db.collection('ablum');
    collection.find({},{"_id": 0}).sort({"date":-1}).limit(2).toArray(function(err, docs) {
        callback(docs);
    });
};

var findAllPhotos = function(db, callback) {
    var collection = db.collection('ablum');
    collection.find({},{"_id": 0}).sort({"date":-1}).toArray(function(err, docs) {
        callback(docs);
    });
};


app.set('port', 80);
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/static', express.static('public')); //指定静态文件夹
app.use(morgan('log: :remote-addr [:date[clf]] :status (:response-time ms) :method :url')); //输出日志

app.get(['/','/ablum'], function(req, res) {
    MongoClient.connect(url, function(err, db) {
        findLastPhotos(db, function(result) {
            res.render('album',{photos:result});            
            db.close();
        });
    });
});

app.get('/ablum/init', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        insertDocuments(db, function(result) {
            res.send('init success!');            
            db.close();
        });
    });
});

app.post('/ajax/find_all_photos', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        findAllPhotos(db, function(result) {
            res.json({result: 1, message: '成功', list: result});          
            db.close();
        });
    });
    
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