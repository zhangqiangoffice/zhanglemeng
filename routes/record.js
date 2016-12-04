var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
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

//获取某人某项历史记录
router.get('/history/:type', function(req, res) {
    if (!req.session.user) {
        res.redirect('/member/login');
    } else {
        var target = {
            user_id: req.session.user._id
        }
        MongoClient.connect(dburl, function(err, db) {
            var type = req.params.type;
            var collection = db.collection(type);
            collection.find(target, {sort: ['date', '-1']}).toArray(function(err, docs) {
                var values = [];
                docs.forEach(function(item){
                    var datas = {
                        date: timeToString(item.date),
                        id: item._id
                    }
                    switch (type) {
                        case 'heights':
                        case 'weights':
                            datas.value = item.value;
                            break;
                        case 'blood_press':
                            datas.hi = item.hi;
                            datas.low = item.low;
                    }
                    values.push(datas);
                });
                console.log(`获取${type}历史记录成功`);
                res.render(`record/${type}_history`, {list: values});
                db.close();
            })
        });
    }
});

//提交某人某项记录
router.post('/add', function(req, res) {
    if (!req.session.user) {
        res.redirect('/member/login');
    } else {
        var type = req.body.type;
        MongoClient.connect(dburl, function(err, db) {
            var collection = db.collection(type);
            var datas = {
                user_id: req.session.user._id,
                value: req.body.height,
                date: new Date(req.body.date),
            }
            switch (type) {
                case 'heights':
                case 'weights':
                    datas.value = req.body.value;
                    break;
                case 'blood_press':
                    datas.hi = req.body.hi;
                    datas.low = req.body.low;
                    break;
            }
            collection.insert(datas, function(err, result){
                console.log(`插入一个新的记录到${type}`);
                res.json({result: 1, message: '数据保存成功'});
                db.close();
            });
        });
    }
});

//删除某条个人记录
router.post('/delete', function(req, res) {
    if (!req.session.user) {
        res.redirect('./login');
    } else {
        MongoClient.connect(dburl, function(err, db) {
            var collection = db.collection(req.body.type);
            var target = {
                _id: ObjectID(req.body.id),
            }
            collection.deleteOne(target, function(err, result){
                console.log(`从${req.body.type}删除一条记录`);
                res.json({result: 1, message: '数据删除成功'});
                db.close();
            });
        });
    }
});

//首页、个人某项记录页面
router.get('/:type', function(req, res) {
    if (!req.session.user) {
        res.redirect('/member/login');
    } else {
        res.render(`record/${req.params.type}`);
    }
});

module.exports = router;