var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://zhangq:123456@ds111748.mlab.com:11748/zhanglemeng';

//个人记录首页
router.get('/index', function(req, res) {
    if (!req.session.user) {
        res.redirect('../member/login');
    } else {
        res.render('record/index');
    }
});

//个人身高记录
router.get('/height', function(req, res) {
    if (!req.session.user) {
        res.redirect('../member/login');
    } else {
        res.render('record/height');
    }
});

//个人体重记录
router.get('/weight', function(req, res) {
    if (!req.session.user) {
        res.redirect('../member/login');
    } else {
        res.render('record/weight');
    }
});

//个人血压记录
router.get('/blood_press', function(req, res) {
    if (!req.session.user) {
        res.redirect('../member/login');
    } else {
        res.render('record/blood_press');
    }
});

//提交身高记录
router.post('/height', function(req, res) {
    if (!req.session.user) {
        res.redirect('./login');
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