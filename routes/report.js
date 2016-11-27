var express = require('express');
var router = express.Router();
var morgan = require('morgan');

router.get('/add', function(req, res) {
    res.render('report_add',{message: '新增报告'});
});

module.exports = router;