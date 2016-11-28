var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongo:ds111748.mlab.com:11748/zhanglemeng';

var insertDB = function(db, callback) {
    var collection = db.collection('ablum');
    collection.insert({"foo" : "bar"}, function(err, result){
        callback(result.result);
    });
};

//用户登录
router.get('/login', function(req, res) {
    res.render('member/login');
});

//提交密码
router.post('/login', function(req, res) {
    var user={
        username:'admin',
        password:'admin'
    }
    if(req.body.username == user.username && req.body.password == user.password) {
        req.session.user = user;
        res.json({result: 1, message: '成功'});
    }else{
        req.session.error = "用户名或密码不正确";
        res.json({result: 0, message: '用户名或密码不正确'});
    }
});

//用户首页
router.get('/index', function(req, res) {
    if (!req.session.user) {
        res.redirect('./login');
    }
    res.render('member/index', {user: req.session.user});
});

//登出接口
router.post('/logout', function(req, res) {
    req.session.user = false;
    res.json({result: 1, message: '成功'});
});

//操作数据库
router.post('/insert', function(req, res) {
    MongoClient.connect(dburl, function(err, db) {
        insertDB(db, function(result) {
            res.json({result: 1, message: '成功'});          
            db.close();
        });
    });
    
});

module.exports = router;