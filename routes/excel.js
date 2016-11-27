var express = require('express');
var router = express.Router();
var xlsx = require('node-xlsx');
var morgan = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/zhanglemeng';

//对象数组按指定属性 去重去空
Array.prototype.unique2 = function(item)
{
    var n = {},r=[]; //n为hash表，r为临时数组
    for(var i = 0; i < this.length; i++) {//遍历当前数组
        if (!n[this[i][item]] && this[i][item] !== null) {//如果hash表中没有当前项
            n[this[i][item]] = true; //存入hash表
            r.push(this[i]); //把当前数组的当前项push到临时数组里面
        }
    }
    return r;
};

var updateXinChouQuan = function(db, datas, callback) {
    db.dropCollection('xin_chou_quan');
    var collection = db.collection('xin_chou_quan');
    collection.insert(datas, function(err, result){
    callback(result.result);
    });
};

var insertTreeStruct = function(db, datas, callback) {
    var collection = db.collection('tree_struct');
    collection.insert(datas,{safe:true},function(err, result){
        callback(result);
    }); 

};

var findDuXunZhang = function(db, callback) {
    db.dropCollection('tree_struct');
    var collection = db.collection('xin_chou_quan');
    collection.find({},{duxunqu: 1, _id: 0}).toArray(function(err, result){
        result = result.unique2('duxunqu');
        var duxunzhang = [];
        var len = result.length;
        for (var i = 0; i < len; i++) {
            result[i].iconSkin = "duxunzhang";
            result[i].name = result[i].duxunqu;
            result[i].id = result[i].duxunqu;
            result[i].pId = '0';
            duxunzhang.push(result[i]);
        }
        callback(duxunzhang);
    });
};

var findZhuanXun = function(db, callback) {
    var collection = db.collection('xin_chou_quan');
    collection.find({},{duxunqu: 1, duxunshi: 1, _id: 0}).toArray(function(err, result){
        result = result.unique2('duxunshi');
        var zhuanxun = [];
        var len = result.length;
        for (var i = 0; i < len; i++) {
            result[i].iconSkin = "zhuanxun";
            result[i].pId = result[i].duxunqu;
            result[i].name = result[i].duxunshi;
            result[i].id = result[i].duxunshi.split("（")[0];
            zhuanxun.push(result[i]);
        }
        callback(zhuanxun);
    });
};

var findFenBuJingLi = function(db, callback) {
    var collection = db.collection('xin_chou_quan');
    collection.find({},{duxunqu: 1, duxunshi: 1, fenbu: 1, _id: 0}).toArray(function(err, result){
        result = result.unique2('fenbu');
        var fenbujingli = [];
        var len = result.length;
        for (var i = 0; i < len; i++) {
            var fenbu = result[i].fenbu;
            var duxunshi = result[i].duxunshi;
            var duxunqu = result[i].duxunqu;
            result[i].iconSkin = "fenbujingli";
            result[i].id = fenbu;
            result[i].name = fenbu;
            if (!duxunshi) {
                result[i].pId = duxunqu;
                fenbujingli.push(result[i]);
            } else if (duxunshi.split('（')[0] !== fenbu) {
                result[i].pId = duxunshi.split('（')[0];
                fenbujingli.push(result[i]);
            }
        }
        callback(fenbujingli);
    });
};

var findFenBuFuJingLi = function(db, callback) {
    var collection = db.collection('xin_chou_quan');
    collection.find({level: '副经理'},{fenbu: 1, name: 1, level: 1, _id: 0}).toArray(function(err, result){
        var fenbufujingli = [];
        var len = result.length;
        for (var i = 0; i < len; i++) {
            result[i].iconSkin = "fenbufujingli";
            result[i].pId = result[i].fenbu;
            result[i].name = result[i].name;
            result[i].id = result[i].name;
            fenbufujingli.push(result[i]);
        }
        callback(fenbufujingli);
    });
};

var findKeHuJingLi = function(db, callback) {
    var collection = db.collection('xin_chou_quan');
    collection.find({level: '客户经理'},{fenbu: 1, name: 1, level: 1, _id: 0}).toArray(function(err, result){
        var kehujingli = [];
        var len = result.length;
        for (var i = 0; i < len; i++) {
            result[i].iconSkin = "kehujingli";
            result[i].pId = result[i].fenbu;
            result[i].name = result[i].name;
            result[i].id = result[i].name;
            kehujingli.push(result[i]);
        }
        callback(kehujingli);
    });
};

var initTarget = function(db, target, callback) {
    db.dropCollection('targets');
    var date = (new Date()).toLocaleString().substring(0, 10);
    console.log(date);
    var collection = db.collection('targets');
    collection.insert(target,{safe:true},function(err, result){
        callback(result);
    });
};

var findDistrict = function(db, callback) {
    var collection = db.collection('xin_chou_quan');
    collection.distinct('district', function(err, result){
        callback(result);
    });
};

var findHrRegistered = function(db, callback) {
    var collection = db.collection('xin_chou_quan');
    collection.aggregate([{$group : {_id : "$district", total : {$sum : 1}}}]).toArray(function(err, result){
        callback(result);
    });
};

var initBook = function(db, callback) {
    findDistrict(db, function(districtArr) {
        db.dropCollection('book');
        var collection = db.collection('book');
        var len = districtArr.length;
        var list = [];
        for (var i = 0; i < len; i++) {
            var o_dis = {
                name: districtArr[i],
                id: districtArr[i],
                human: [{date:"2016-08-03", book: 2},{date:"2016-08-04", book: 4}],
                business: [{date:"2016-08-03", book: 2.23},{date:"2016-08-04", book: 2.58}],
                supervisor: '方浩'
            };
            list.push(o_dis);
        }
        collection.insert(list,{safe:true},function(err, result){
            callback(result);
        });
    });
};


router.get('/importExcel', function(req, res) {
    var filename='./public/upload/excel/新筹全.xlsx';
    var obj = xlsx.parse(filename)[0].data;
    var datas = [];
    var len = obj.length;
    for (var i = 1; i < len; i++) {
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
            findDuXunZhang(db, function(duxunzhang) {
                insertTreeStruct(db, duxunzhang, function(result){
                    findZhuanXun(db, function(zhuanxun){
                        insertTreeStruct(db, zhuanxun, function(result){
                            findFenBuJingLi(db, function(fenbujingli){
                                insertTreeStruct(db, fenbujingli, function(result){
                                    findFenBuFuJingLi(db, function(fenbufujingli){
                                        insertTreeStruct(db, fenbufujingli, function(result){
                                            findKeHuJingLi(db, function(kehujingli){
                                                insertTreeStruct(db, kehujingli, function(result){
                                                    res.json({result: 1, message: '成功', list: result});          
                                                    db.close();
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

router.get('/initTarget', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        findDistrict(db, function(districtArr) {
            var month = (new Date()).getMonth() + 1;
            var list = [];
            var len = districtArr.length;
            for (var i = 0; i <  len; i++) {
                var o_dis = {
                    name: districtArr[i],
                    id: districtArr[i],
                    h1: 0, 
                    s1: 0, 
                    h2: 0, 
                    s2: 0, 
                    h3: 0, 
                    s3: 0
                };
                list.push(o_dis); 
            }
            var target = {
                month: month,
                day1: 10,
                day2: 20,
                day3: 25,
                list: list
            };
            // console.log(target);
            initTarget(db, target, function(result){
                res.json({result: 1, message: '成功', list: result});          
                db.close();
            });
        });
    });
});

router.get('/initBook', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        initBook(db, function(result) {
            res.json({result: 1, message: '成功', list: result});          
            db.close();
        });
    });
});

router.get('/findHrRegistered', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        findHrRegistered(db, function(result) {
            res.json({result: 1, message: '成功', list: result});          
            db.close();
        });
    });
});

module.exports = router;