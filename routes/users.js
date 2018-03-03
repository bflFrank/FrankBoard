var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('studentView', {
   title: 'Student',
   message: 'student'
 });
});

module.exports = router;
