var express = require('express');
var router = express.Router();
var db = require('../../db/db')

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('./studentViews/studentView', {
      title: 'Student',
      message: 'Student',
    });

});

module.exports = router;
