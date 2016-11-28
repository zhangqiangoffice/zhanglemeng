var express = require('express');
var router = express.Router();

//用户登录
router.get('/login', function(req, res) {
    res.render('member/login');
});

//提交密码
router.post('/login', function(req, res) {
    var user={
        username:'admin',
        password:'admin'
    }
    if(req.body.username == user.username && req.body.password == user.password) {
        req.session.user = user;
        res.json({result: 1, message: '成功'});
    }else{
        req.session.error = "用户名或密码不正确";
        res.json({result: 0, message: '用户名或密码不正确'});
    }
});

//用户首页
router.get('/index', function(req, res) {
    if (!req.session.user) {
        res.redirect('./login');
    }
    res.render('member/index', {user: req.session.user});
});

module.exports = router;