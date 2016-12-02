var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://zhangq:123456@ds111748.mlab.com:11748/zhanglemeng';

function tran_val(val){
    if(parseInt(val)<10){
        val = "0" + val;
    }
    return val;
}

function timeToString(time) {
    var datenew = new Date(time); 

    var year = datenew.getFullYear(); 
    var month = tran_val(datenew.getMonth()+1);
    var date = tran_val(datenew.getDate()); 

    var hour = tran_val(datenew.getHours());
    var minute = tran_val(datenew.getMinutes()); 

    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute;
}

//个人记录首页
router.get('/index', function(req, res) {
    if (!req.session.user) {
        res.redirect('../member/login');
    } else {
        res.render('record/index');
    }
});

//新增个人身高记录
router.get('/height', function(req, res) {
    if (!req.session.user) {
        res.redirect('../member/login');
    } else {
        res.render('record/height');
    }
});

//新增个人体重记录
router.get('/weight', function(req, res) {
    if (!req.session.user) {
        res.redirect('../member/login');
    } else {
        res.render('record/weight');
    }
});

//新增个人血压记录
router.get('/blood_press', function(req, res) {
    if (!req.session.user) {
        res.redirect('../member/login');
    } else {
        res.render('record/blood_press');
    }
});

//个人身高历史记录
router.get('/height_history', function(req, res) {
    if (!req.session.user) {
        res.redirect('../member/login');
    } else {
        var target = {
            user_id: req.session.user._id
        }
        MongoClient.connect(dburl, function(err, db) {
            var collection = db.collection('heights');
            collection.find(target).toArray(function(err, docs) {
                var values = [];
                docs.forEach(function(item){
                    values.push({date: timeToString(item.date), value: item.value});
                });
                console.log("获取身高历史记录成功");
                res.render('record/height_history', {list: values});
                db.close();
            })
        });
    }
});

//个人体重历史记录
router.get('/weight_history', function(req, res) {
    if (!req.session.user) {
        res.redirect('../member/login');
    } else {
        var target = {
            user_id: req.session.user._id
        }
        MongoClient.connect(dburl, function(err, db) {
            var collection = db.collection('weights');
            collection.find(target).toArray(function(err, docs) {
                var values = [];
                docs.forEach(function(item){
                    values.push({date: timeToString(item.date), value: item.value});
                });
                console.log("获取体重历史记录成功");
                res.render('record/weight_history', {list: values});
                db.close();
            })
        });   
    }
});

//个人血压历史记录
router.get('/blood_press_history', function(req, res) {
    if (!req.session.user) {
        res.redirect('../member/login');
    } else {
        var target = {
            user_id: req.session.user._id
        }
        MongoClient.connect(dburl, function(err, db) {
            var collection = db.collection('blood_press');
            collection.find(target).toArray(function(err, docs) {
                var values = [];
                docs.forEach(function(item){
                    values.push({date: timeToString(item.date), low: item.low, hi: item.hi});
                });
                console.log("获取血压历史记录成功");
                res.render('record/blood_press_history', {list: values});
                db.close();
            })
        });
    }
});

//提交身高记录
router.post('/height', function(req, res) {
    if (!req.session.user) {
        res.redirect('./login');
    } else {
        MongoClient.connect(dburl, function(err, db) {
            var collection = db.collection('heights');
            var height = {
                user_id: req.session.user._id,
                value: req.body.height,
                date: new Date(req.body.date),
            }
            collection.insert(height, function(err, result){
                console.log('插入一个新的身高记录到heights');
                res.json({result: 1, message: '数据保存成功'});
                db.close();
            });
        });
    }
});

//提交体重记录
router.post('/weight', function(req, res) {
    if (!req.session.user) {
        res.redirect('./login');
    } else {
        MongoClient.connect(dburl, function(err, db) {
            var collection = db.collection('weights');
            var weight = {
                user_id: req.session.user._id,
                value: req.body.weight,
                date: new Date(req.body.date),
            }
            collection.insert(weight, function(err, result){
                console.log('插入一个新的身高记录到weights');
                res.json({result: 1, message: '数据保存成功'});
                db.close();
            });
        });
    }
});

//提交血压记录
router.post('/blood_press', function(req, res) {
    if (!req.session.user) {
        res.redirect('./login');
    } else {
        MongoClient.connect(dburl, function(err, db) {
            var collection = db.collection('blood_press');
            var blood_press = {
                user_id: req.session.user._id,
                hi: req.body.hi,
                low: req.body.low,
                date: new Date(req.body.date),
            }
            collection.insert(blood_press, function(err, result){
                console.log('插入一个新的血压记录到blood_press');
                res.json({result: 1, message: '数据保存成功'});
                db.close();
            });
        });
    }
});


module.exports = router;