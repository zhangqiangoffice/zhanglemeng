var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://zhangq:123456@ds111748.mlab.com:11748/zhanglemeng';

var insertDB = function(db, callback) {
    var user={
        username:'admin',
        password:'admin'
    }
    var collection = db.collection('users');
    collection.insert(user, function(err, result){
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
        res.json({result: 1, message: '登录成功'});
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
    res.render('member/index');
});

//登出接口
router.post('/logout', function(req, res) {
    req.session.user = false;
    res.json({result: 1, message: '登出成功'});
});

//用户注册页面
router.get('/register', function(req, res) {
    res.render('member/register');
});

//用户提交注册
router.post('/register', function(req, res) {
    MongoClient.connect(dburl, function(err, db) {
        var collection = db.collection('users');
        collection.insert(user, function(err, result){
            console.log('插入一个新的用户到users');
            res.json({result: 1, message: '新用户注册成功'});
        });
    });
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