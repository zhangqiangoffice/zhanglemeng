var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var dburl = 'mongodb://zhangq:123456@ds111748.mlab.com:11748/zhanglemeng';

function birthToAge(birth) {
    var returnAge;  
    var b = new Date(birth);  
    var birthYear = b.getFullYear();  
    var birthMonth = b.getMonth();
    var birthDay = b.getDate(); 
      
    d = new Date();  
    var nowYear = d.getFullYear();  
    var nowMonth = d.getMonth();  
    var nowDay = d.getDate();

    if(nowYear == birthYear){  
        returnAge = 0;//同年 则为0岁  
    }  
    else{  
        var ageDiff = nowYear - birthYear ; //年之差  
        if (ageDiff > 0){  
            if (nowMonth == birthMonth) {  
                var dayDiff = nowDay - birthDay;//日之差  
                if (dayDiff < 0) {  
                    returnAge = ageDiff - 1;  
                } else {  
                    returnAge = ageDiff ;  
                }  
            } else {  
                var monthDiff = nowMonth - birthMonth;//月之差  
                if(monthDiff < 0) {  
                    returnAge = ageDiff - 1;  
                } else {  
                    returnAge = ageDiff ;  
                }  
            }  
        } else {  
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天  
        }  
    }  
      
    return returnAge;//返回周岁年龄  

}

router.get('/add', function(req, res) {
    if (!req.session.user) {
        res.redirect('/member/login');
    } else {
        var target = {
            _id: ObjectID(req.session.user._id)
        }
        MongoClient.connect(dburl, function(err, db) {
            var type = req.params.type;
            var collection = db.collection('users');
            collection.find(target).toArray(function(err, docs) {
                if (docs.length === 1) {
                    var user = docs[0];
                    //存在性别、出生年月
                    var member = {finished: false};
                    if (user.gender && user.birth) {
                        var age = birthToAge(user.birth);
                        member = {
                            finished: true,
                            alias: user.alias, 
                            gender: user.gender,
                            age: age
                        }
                    }
                    res.render('report/add', {member: member});
                }

                db.close();
            })
        });
    }
});

router.post('/add', function(req, res) {
    res.render('report/result',{message: '诊断结果'});
});

module.exports = router;