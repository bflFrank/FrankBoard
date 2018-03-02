var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('You\'r now in the Admin View');
});


module.exports = router;
