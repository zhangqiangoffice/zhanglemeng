var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');

app.set('port', 80);
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/static', express.static('public')); //指定静态文件夹
app.use(morgan('combined')); //输出日志

app.get('/', function(req, res) {
    res.render('album');
});

app.post('/api/get_two_photos', function(req, res) {
    var photos = [
        {id: 1, path: '/static/img/1.jpg', date: '2016年7月1日'},
        {id: 2, path: '/static/img/2.jpg', date: '2016年6月2日'},
        {id: 3, path: '/static/img/3.jpg', date: '2016年7月3日'},
        {id: 4, path: '/static/img/4.jpg', date: '2016年7月4日'},
        {id: 5, path: '/static/img/5.jpg', date: '2016年7月5日'},
        {id: 6, path: '/static/img/6.jpg', date: '2016年7月6日'},
        {id: 7, path: '/static/img/7.jpg', date: '2016年7月7日'},
        {id: 8, path: '/static/img/8.jpg', date: '2016年7月8日'},
        {id: 9, path: '/static/img/9.jpg', date: '2016年7月9日'},
        {id: 10, path: '/static/img/10.jpg', date: '2016年7月10日'},
        {id: 11, path: '/static/img/11.jpg', date: '2016年7月11日'},
        {id: 12, path: '/static/img/12.jpg', date: '2016年7月12日'},
        {id: 13, path: '/static/img/13.jpg', date: '2016年7月13日'},
        {id: 14, path: '/static/img/14.jpg', date: '2016年7月14日'},
        {id: 15, path: '/static/img/15.jpg', date: '2016年7月15日'},
        {id: 16, path: '/static/img/16.jpg', date: '2016年7月16日'}
    ];
    var id = req.body.id;
    var to = req.body.to;
    var len = photos.length;
    var list;
    var i1, i2;

    if (to.toString() === '1') {
        i1 = (id - 0) % len;
        i2 = (id - 0 + 1) % len;
    } else {
        i1 = (id - 3 + len) % len;
        i2 = (id - 2 + len) % len;
    }
    list = [photos[i1], photos[i2]];


    res.json({result: 1, list: list});
});


app.use(function(req, res) {
    res.status(404);
    res.send('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.send('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://121.41.66.82:' +
    app.get('port') + ';press Ctrl-c to terminate.');
});