var express = require('express');
var multer  = require('multer');
var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});
var router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage: storage }).single('avatar');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', upload, function(req, res, next){
  gm(req.file.path)
  .resize(240, 240)
  .noProfile()
  .write('./public/uploads/thumb_240x240/' + req.file.fieldname + '-' + Date.now() + '.png', function(err){
    if(!err) console.log('done');
  });
});


module.exports = router;
