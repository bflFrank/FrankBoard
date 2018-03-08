var express = require('express');
var router = express.Router();
var db = require('../../db/db')

/* GET home page. */
router.get('/', function(req, res, next) {
  db.all('SELECT * FROM users WHERE studentID = 12345', function(err, rows){
    if(err) throw err;
    var student = rows[0];
    if(!student){
      console.log('No student found');
      return;
    }

    res.render('studentView', {
      title: 'Student',
      message: 'Student',
      student: student
    });
  });

});

module.exports = router;
