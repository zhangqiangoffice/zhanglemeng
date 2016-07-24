var express = require('express');
var router = express.Router();
var morgan = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/zhanglemeng';

var findAllPhotos = function(db, callback) {
    var collection = db.collection('ablum');
    collection.find({},{"_id": 0}).sort({"date":-1}).toArray(function(err, docs) {
        callback(docs);
    });
};

router.post('/find_all_photos', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        findAllPhotos(db, function(result) {
            res.json({result: 1, message: '成功', list: result});          
            db.close();
        });
    });
    
});

module.exports = router;