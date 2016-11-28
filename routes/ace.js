var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/zhanglemeng';
var app = express();

var formidable = require('formidable');
var fs = require('fs');
var AVATAR_UPLOAD_FOLDER = '/upload/';

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

var dateFormat = function (date) {
    var arr = date.split('-');
    var str = arr[0] + '年' + Number(arr[1]) + '月' + Number(arr[2]) + '日';
    return str;
};

/* GET ablum listing. */
router.get('/', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
        findLastPhotos(db, function(result) {
            result[0].date = dateFormat(result[0].date);
            result[1].date = dateFormat(result[1].date);

            res.render('album', {photos:result} );            
            db.close();
        });
    });
});

router.get('/add', function(req, res) {
    res.render('album_add',{message: ''});
});

router.post('/add', function(req, res) {
    	

    	var form = new formidable.IncomingForm();   //创建上传表单
	    form.encoding = 'utf-8';		//设置编辑
	    form.uploadDir = 'public/upload';	 //设置上传目录
	    form.keepExtensions = true;	 //保留后缀
	    form.maxFieldsSize = 10 * 1024 * 1024;   //文件大小

		form.on('error', function(err) {
		        console.log(err); //各种错误
		        res.render('album_add',{message: 'formidable错误'});
		    })

		form.parse(req, function(err, fields, files) {
			res.redirect('/ablum');
		});
		
});

router.get('/init', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        insertDocuments(db, function(result) {
            res.send('init success!');            
            db.close();
        });
    });
});

module.exports = router;