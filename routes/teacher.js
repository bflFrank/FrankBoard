var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('teacherView', {
   title: 'Teacher',
   message: 'Teacher'
 });
});


module.exports = router;
