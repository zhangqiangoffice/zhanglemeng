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
router.post('/api001', function(req, res) {
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



module.exports = router;