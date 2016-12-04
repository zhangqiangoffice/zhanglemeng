var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://zhangq:123456@ds111748.mlab.com:11748/zhanglemeng';

//用户登录
router.get('/login', function(req, res) {
    res.render('member/login');
});

//提交密码，验证登录
router.post('/login', function(req, res) {
    var user={
        username: req.body.username,
        password: req.body.password
    }
    MongoClient.connect(dburl, function(err, db) {
        var collection = db.collection('users');
        collection.find(user).toArray(function(err, docs) {
            if (docs.length === 1) {
                var user_session = {
                    username : docs[0].username,
                    _id : docs[0]._id,
                }
                req.session.user = user_session;
                console.log(user.username + "登录成功");
                res.json({result: 1, message: '登录成功'});
            } else {
                req.session.error = "用户名或密码不正确";
                res.json({result: 0, message: '用户名或密码不正确'});
            }
            db.close();
        })
    });
});

//用户首页
router.get('/index', function(req, res) {
    if (!req.session.user) {
        res.redirect('/member/login');
    } else {
        res.render('member/index', {username: req.session.user.username});
    }
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
        var username = req.body.username;
        var password = req.body.password;
        collection.find({username: username}).toArray(function(err, docs) {
            if (docs.length) {
                res.json({result: 0, message: '用户名已存在'});
                db.close();
            } else {
                var user = {
                    username: username,
                    password: password
                }
                collection.insert(user, function(err, result){
                    console.log('插入一个新的用户到users');
                    req.session.user = user;
                    res.json({result: 1, message: '新用户注册成功'});
                    db.close();
                });
            }
        })
    });
});

//修改密码页
router.get('/reset', function(req, res) {
    if (!req.session.user) {
        res.redirect('/member/login');
    } else {
        
        res.render('member/reset');
    }
});

//修改新密码
router.post('/set', function(req, res) {
    if (!req.session.user) {
        res.redirect('/member/login');
    } else {
        MongoClient.connect(dburl, function(err, db) {
            var collection = db.collection('users');
            var username = req.session.user.username;
            var password = req.body.old;
            collection.updateOne({username: username , password: password},
                {$set: {password: req.body.new}}, function(err, result) {
                if (result.result.ok === 1 && result.result.n === 1) {
                    res.json({result: 1, message: '密码修改成功'});
                } else {
                    res.json({result: 0, message: '密码修改失败'});
                }
                db.close();
            });
        });
    }
});


module.exports = router;