var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('./adminViews/adminView', {
   title: 'Admin',
   message: 'Administrator'
 });
});

module.exports = router;
