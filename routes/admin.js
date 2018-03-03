var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('adminView', {
   title: 'Admin',
   message: 'Admin'
 });
});


module.exports = router;
