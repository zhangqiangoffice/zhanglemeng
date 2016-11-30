var express = require('express');
var router = express.Router();
var morgan = require('morgan');

router.get('/add', function(req, res) {
    res.render('report_add',{message: '新增报告'});
});

router.post('/add', function(req, res) {
    res.render('result',{message: '诊断结果'});
});

module.exports = router;