var express = require('express');
var router = express.Router();
var morgan = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/zhanglemeng';

var extend = function(des, src, override){
   if(src instanceof Array){
       for(var i = 0, len = src.length; i < len; i++)
            extend(des, src[i], override);
   }
   for( var j in src){
       if(override || !(j in des)){
           des[j] = src[j];
       }
   } 
   return des;
};

var findTreeStruct = function(db, callback) {
    var collection = db.collection('tree_struct');
    collection.find({},{id: 1, pId: 1, name: 1, iconSkin: 1, _id: 0}).toArray(function(err, result){
        callback(result);
    });
};

var findTarget = function(db, callback) {
    var cruMonth = new Date().getMonth() + 1;
    var collection = db.collection('targets');
    collection.findOne({month: cruMonth},{_id: 0},function(err, result){
        callback(result);
    });
};

var findHrTarget = function(db, callback) {
    findTarget (db, function(result) {
        var cruDay = new Date().getDate();
        var tarDay = 1;
        var list = result.list;
        var len = list.length;
        var hrList = [];
        var i = 1;
        for (; i <= 3; i++) {
            if (cruDay > result['day' + i]) {
                tarDay = result['day' + i];
                break;
            }
        }

        for (var j = 0; j < len; j++) {
            var o_dis = {
                name: list[j].name,
                id: list[j].id,
                target: list[j]['h' + i]
            };
            hrList.push(o_dis);
        }
        callback(result);
    });  
};

var findHrRegistered = function(db, callback) {
    var collection = db.collection('xin_chou_quan');
    collection.aggregate([{$group : {_id : "$district", total : {$sum : 1}}}]).toArray(function(err, result){
        callback(result);
    });
};


var updateTarget = function(db, datas, callback) {
    var collection = db.collection('targets');
    collection.findOne({},{_id: 0},function(err, result){
        for (var i = 1; i <= 3; i++) {
            var theDay = 'day' + i;
            if (datas[theDay]) {
                result[theDay] = datas[theDay] - 0 ;
            }

        }
        // console.log(datas);
        if (datas.list) {
            var len = datas.list.length;
            for (var j = 0; j < len; j++) {
                var id = datas.list[j].id;
                var duxunqu;
                for (var o_duxunqu in result.list) {
                    //console.log(o_duxunqu);
                    if ((result.list[o_duxunqu].id + '') === (id + '')) {
                        duxunqu = result.list[o_duxunqu];
                        break;
                    }
                }
                for (var item in datas.list[j]) {
                    duxunqu[item] = datas.list[j][item];
                }
            }
        }
        collection.update({month:8}, result, function(err, result){
            //console.log(result.result);
            callback(result.result);
        });

    });
};

//返回真
router.post('/true', function(req, res) {
    res.json({result: 1, message: '成功'});
});

//返回假
router.post('/false', function(req, res) {
    res.json({result: 0, message: '失败'});
});


//组织树
router.post('/api001', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        findTreeStruct(db, function(result){
            res.json({result: 1, message: '成功', list: result});
        });
    });
    
});

//个人信息
router.post('/api002', function(req, res) {
    res.json({result: 1, message: '成功', name: '', level:'', sex:''});
});


//获取任务目标
router.post('/api003', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        findTarget(db, function(result){
            res.json({result: 1, message: '成功', month:result.month, day1: result.day1, day2: result.day2, day3: result.day3, list: result.list});
        });
    });
});

//编辑任务目标
router.post('/api004', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        updateTarget(db, req.body, function(result){
            res.json({result: 1, message: '更新成功！'});
        });
    });
});

//新筹督训区人力状况（API005）
router.post('/api005', function(req, res) {
    // MongoClient.connect(url, function(err, db) {
    //     findHrTarget(db, function(result){
    //         res.json({result: 1, message: '成功', month:result.month, day1: result.day1, day2: result.day2, day3: result.day3, list: result.list});
    //     });
    // });
    
    var books = [
        {name: '淮北' , id: 1, human: [{date:"", book: 2},{date:"", book: 4}], business: [{date:"", book: 2.23},{date:"", book: 2.58}], supervisor: '方浩'},
        {name: '淮北' , id: 1, human: [{date:"", book: 2},{date:"", book: 4}], business: [{date:"", book: 2.23},{date:"", book: 2.58}], supervisor: '方浩'},
        {name: '淮北' , id: 1, human: [{date:"", book: 2},{date:"", book: 4}], business: [{date:"", book: 2.23},{date:"", book: 2.58}], supervisor: '方浩'},
        {name: '淮北' , id: 1, human: [{date:"", book: 2},{date:"", book: 4}], business: [{date:"", book: 2.23},{date:"", book: 2.58}], supervisor: '露露'}
    ];

    var list = [
        {name: '淮北' , id: 1, target: 24, today: 1, month: 14, history: 16, hr: 15, supervisor: '方浩'},
        {name: '滁州' , id: 2, target: 24, today: 0, month: 12, history: 14, hr: 14, supervisor: '方浩'},
        {name: '凤阳' , id: 3, target: 36, today: 1, month: 16, history: 18, hr: 15, supervisor: '露露'}
    ];


    res.json({result: 1, message: '成功', day: 18, list: list});
});

//新筹督训区业绩状况（API007）
router.post('/api007', function(req, res) {
    var list = [
        {name: '淮北' , id: 1, target: 100, today: 10.5, month: 14.5, history: 16.3, receive: 15.2, accept: 15, supervisor: '方浩'},
        {name: '滁州' , id: 2, target: 100, today: 5, month: 12.6, history: 14.7, receive: 16.3, accept: 16, supervisor: '方浩'},
        {name: '凤阳' , id: 3, target: 150, today: 1.3, month: 16, history: 18, receive: 15.2, accept: 15, supervisor: '方浩'}
    ];
    res.json({result: 1, message: '成功', day: 18, list: list});
});

//新筹督训区业务占比（API009）
router.post('/api009', function(req, res) {
    var list = [
        {name: '淮北' , receive_hx: 10.5, receive_zh: 14.5, accept_hx: 16.3, accept_zh: 15.2, supervisor: '方浩'},
        {name: '滁州' , receive_hx: 5, receive_zh: 12.6, accept_hx: 14.7, accept_zh: 16.3, supervisor: '方浩'},
        {name: '凤阳' , receive_hx: 1.3, receive_zh: 16, accept_hx: 18, accept_zh: 15.2, supervisor: '露露'}
    ];
    res.json({result: 1, message: '成功', day: 18, list: list});
});

//讯车贷
router.post('/xunchedai/api005', function(req, res) {
    var list = [
        {name: '淮北' , receive_hx: 10.5, receive_zh: 14.5, accept_hx: 16.3, accept_zh: 15.2, supervisor: '方浩'},
        {name: '滁州' , receive_hx: 5, receive_zh: 12.6, accept_hx: 14.7, accept_zh: 16.3, supervisor: '方浩'},
        {name: '凤阳' , receive_hx: 1.3, receive_zh: 16, accept_hx: 18, accept_zh: 15.2, supervisor: '露露'}
    ];
    res.json({result: 1, message: '成功', total:3, list: list});
});


module.exports = router;