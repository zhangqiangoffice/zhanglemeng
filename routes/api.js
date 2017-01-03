var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://zhangq:123456@ds111748.mlab.com:11748/zhanglemeng';

const FAIL = 0;
const SUCCESS = 1;

//通过Id寻找用户
var findUserById = function(db, id, callback) {
    var collection = db.collection('users');
    collection.findOne({_id: id},{_id: 0, name: 1},function(err, result){
        callback(result);
    });
};

//返回真
router.post('/true', function(req, res) {
    res.json({result: SUCCESS, message: '成功'});
});

//返回假
router.post('/false', function(req, res) {
    res.json({result: FAIL, message: '失败'});
});

//获取纸条列表
router.post('/getPapers', function(req, res) {
    var datas = {
        word: req.body.word,
        password: req.body.password
    }
    MongoClient.connect(dburl, function(err, db) {
        var collection = db.collection('papers');
        if (datas.word === '') {
          collection.find({}).toArray(function(err, docs) {  
            for (var i = docs.length - 1; i >= 0; i--) {
              findUserById(db, docs[i].authorId, function(user) {
                console.log(user);
                docs[i].authorName = user.name;
              })
              
            }
            console.log("获取纸条列表");
            res.json({result: SUCCESS, message: '获取纸条列表成功', list: docs});
          })
        } else {
        }
        db.close();
    });
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
                res.json({result: 1, message: '登录成功', name: docs[0].name, username: docs[0].username});
            } else {
                req.session.error = "用户名或密码不正确";
                res.json({result: 0, message: '用户名或密码不正确'});
            }
            db.close();
        })
    });
});

//验证登录是否有效
router.post('/check', function(req, res) {
    if (!req.session.user) {
        res.json({result: 0, message: '登录失效'});
    } else {
        res.json({result: 1, message: '登录有效'});
    }
});

module.exports = router;