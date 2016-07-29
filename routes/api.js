var express = require('express');
var router = express.Router();
var morgan = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/zhanglemeng';

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
    var result = [
        { id:'1', pId:'0', name:"朱新民", iconSkin:"duxunzhang"},
        { id:'1@1', pId:'1', name:"金敏", iconSkin:"zhuanxun"},
        { id:'1@2', pId:'1', name:"王慧龙", iconSkin:"zhuanxun"},
        { id:'1@3', pId:'1', name:"李业旗", iconSkin:"zhuanxun"},
        { id:'1@4', pId:'1', name:"吴晓露", iconSkin:"fenbujingli"},
        
        { id:'1@3@1', pId:'1@3', name:"陈群", iconSkin:"fenbujingli"},
        { id:'1@3@2', pId:'1@3', name:"程涛", iconSkin:"fenbujingli"},
        { id:'1@3@3', pId:'1@3', name:"王秋芬", iconSkin:"fenbujingli"},

        { id:'1@3@1@1', pId:'1@3@1', name:"胡春雪", iconSkin:"kehujingli"},
        { id:'1@3@1@2', pId:'1@3@1', name:"吕来印", iconSkin:"kehujingli"},


        { id:'2', pId:'0', name:"朱新民" ,iconSkin:"duxunzhang"},
        { id:'2@1', pId:'2', name:"金敏" ,iconSkin:"zhuanxun"},
        { id:'2@2', pId:'2', name:"李业旗" ,iconSkin:"zhuanxun"}
    ];
    res.json({result: 1, message: '成功', list: result});
});

//个人信息
router.post('/api002', function(req, res) {
    res.json({result: 1, message: '成功', name: '肖敏', level:'督训长', sex:'男'});
});

//获取任务目标
router.post('/api003', function(req, res) {
    var list = [
        {name: '淮北' , id: 1, h1: 24, s1: 16, h2: 24, s2: 16, h3: 24, s3: 16},
        {name: '滁州' , id: 2, h1: 2, s1: 16, h2: 2, s2: 6, h3: 24, s3: 8},
        {name: '凤阳' , id: 3, h1: 12, s1: 6, h2: 4, s2: 16, h3: 2, s3: 16}
    ];
    res.json({result: 1, message: '成功', day1: 10, day2: 18, day3: 25, list: list});
});

//新筹督训区人力状况（API005）
router.post('/api005', function(req, res) {
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

module.exports = router;