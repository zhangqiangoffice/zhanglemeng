var express = require('express');
var router = express.Router();
var xlsx = require('node-xlsx');
var morgan = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/zhanglemeng';

var updateXinChouQuan = function(db, datas, callback) {
    db.dropCollection('xin_chou_quan');
    var collection = db.collection('xin_chou_quan');
        collection.insert(datas, function(err, result){
        callback(result.result);
    });
};

var treeXinChouQuan = function(db, datas, callback) {
    //{ id:'1', pId:'0', name:"朱新民", iconSkin:"duxunzhang"},
    // var collection = db.collection('xin_chou_quan');
    //     collection.find().toArray(datas, function(err, result){
    //     callback(result.result);
    // });
};

router.get('/importExcel', function(req, res) {
    var filename='./public/upload/excel/新筹全.xlsx';
    var obj = xlsx.parse(filename)[0].data;
    var datas = [];
    for (var i in obj) {
        var m = {};
        var x = obj[i];
        m.district = x[0];
        m.duxunqu = x[1];
        m.county = x[2];
        m.duxunshi = x[3];
        m.fenbu = x[5];
        m.sex = x[9];
        m.diploma = x[10];
        m.name = x[11];
        m.level = x[12];
        datas.push(m);   
    }
    MongoClient.connect(url, function(err, db) {
        updateXinChouQuan(db, datas, function(result) {
            if (result === 1) {

            }
            res.json({result: 1, message: '成功', list: result});          
            db.close();
        });
    });
});

module.exports = router;